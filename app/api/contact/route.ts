import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
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
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0e24; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="background: linear-gradient(90deg, #a78bfa, #22d3ee); -webkit-background-clip: text; color: #a78bfa; margin-top: 0;">
            New Portfolio Message
          </h2>
          <p style="margin: 8px 0;"><strong style="color:#a78bfa;">Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong style="color:#a78bfa;">Email:</strong> ${email}</p>
          ${subject ? `<p style="margin: 8px 0;"><strong style="color:#a78bfa;">Subject:</strong> ${subject}</p>` : ""}
          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.05); border-left: 3px solid #22d3ee; border-radius: 6px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send the message. Please try again later." },
      { status: 500 }
    );
  }
}
