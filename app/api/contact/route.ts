import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiter: IP → timestamp of last successful send
const rateLimit = new Map<string, number>();
const WINDOW_MS = 60_000; // 1 minute

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// Periodically clear stale entries so the Map doesn't grow forever
setInterval(() => {
  const now = Date.now();
  for (const [ip, ts] of rateLimit) {
    if (now - ts > WINDOW_MS) rateLimit.delete(ip);
  }
}, WINDOW_MS * 5);

export async function POST(request: Request) {
  try {
    // ── Rate-limit check ──────────────────────────────────────────────────
    const ip = getClientIp(request);
    const lastSent = rateLimit.get(ip);
    const now = Date.now();

    if (lastSent !== undefined && now - lastSent < WINDOW_MS) {
      const retryAfterSec = Math.ceil((WINDOW_MS - (now - lastSent)) / 1000);
      return NextResponse.json(
        {
          error: `Please wait ${retryAfterSec} second${retryAfterSec !== 1 ? "s" : ""} before sending another message.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSec) },
        }
      );
    }
    // ─────────────────────────────────────────────────────────────────────

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
      process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const port = Number(SMTP_PORT) || 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL || SMTP_USER,
      replyTo: email,
      subject: subject
        ? `Portfolio: ${subject}`
        : `New message from ${name} via portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f1117;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid #21232e;">
          <h2 style="color:#818cf8;margin-top:0;font-size:20px;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:12px;">
            <tr><td style="padding:6px 0;color:#71717a;width:80px;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding:6px 0;color:#71717a;">Subject</td><td style="padding:6px 0;">${subject}</td></tr>` : ""}
          </table>
          <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.04);border-left:3px solid #4f46e5;border-radius:6px;white-space:pre-wrap;line-height:1.6;">${message}</div>
        </div>
      `,
    });

    // Record successful send time only after the email goes through
    rateLimit.set(ip, now);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send the message. Please try again later." },
      { status: 500 }
    );
  }
}
