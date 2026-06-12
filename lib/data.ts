export const siteConfig = {
  name: "Ayush Deuja",
  role: "Full Stack Developer",
  location: "Biratnagar, Nepal",
  email: "ayushdeuja11@gmail.com",
  github: "https://github.com/ayushdeuja",
  linkedin: "https://www.linkedin.com/in/ayushdeuja",
  resumeUrl: "#",
  tagline:
    "Results-driven Junior Full Stack Developer with expertise in the MERN stack, NestJS, React Native, Next.js, and .NET. I build scalable APIs, web and mobile applications at CloveIT while mentoring students across Biratnagar in web, mobile, and emerging tech.",
};

export const heroRoles = [
  "Full Stack Developer",
  "NestJS & Next.js Engineer",
  "React Native Developer",
  "Tech Mentor & Trainer",
];

export const skillGroups = [
  {
    title: "Backend",
    skills: [
      "NestJS",
      "Node.js",
      "Express.js",
      ".NET / C#",
      "Laravel",
      "REST APIs",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: ["Next.js", "React.js", "React Native"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools & Teaching",
    skills: ["Git & GitHub", "Python", "MIT App Inventor", "Scratch"],
  },
];

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  points: string[];
};

export const workExperience: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    company: "CloveIT, Biratnagar",
    period: "Dec 2025 – Present",
    points: [
      "Build full stack apps with NestJS, Next.js, .NET, React Native, React, MongoDB and PostgreSQL.",
      "Design RESTful APIs and backend services.",
      "Contribute to agile sprints alongside senior developers.",
    ],
  },
  {
    title: "Software Development Intern",
    company: "Ratoguras Pvt. Ltd.",
    period: "Apr – Nov 2025",
    points: [
      "Developed web features; worked on API integration and database design.",
      "Developed responsive frontend features and user interfaces and optimized UI/UX performance.",
    ],
  },
];

export const teachingExperience: ExperienceItem[] = [
  {
    title: "Technology Trainer",
    company: "KVM School, Biratnagar",
    period: "May 2026 – Present",
    points: [
      "Teaching MIT App Inventor, Scratch game dev, Python, robotics & IoT to school students.",
    ],
  },
  {
    title: "Web & App Development Trainer",
    company: "Aragon College, Biratnagar",
    period: "Apr – May 2026",
    points: [
      "Ran an intensive 1-month program: HTML/CSS, JavaScript, Scratch and MIT App Inventor for fresh SEE graduates.",
    ],
  },
  {
    title: "Mentor – Junior Code Fest",
    company: "Pokharya School & DAV School, Biratnagar",
    period: "Feb 2026",
    points: [
      "Mentored students in web, app & game development during the Junior Code Fest competition.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "LabSewa — Laboratory Management System",
    description:
      "Cross-platform lab system with a web portal and a mobile app for test bookings and results delivery.",
    tech: ["NestJS", "React", "React Native"],
    github: "https://github.com/AyushDeuja/lab-sewa-app",
    featured: true,
  },
  {
    title: "Library Management System",
    description:
      "Full-stack system covering book cataloguing, membership, borrowing and returns.",
    tech: ["NestJS", "React", "PostgreSQL"],
    github: "https://github.com/AyushDeuja/LMS",
    featured: true,
  },
  {
    title: "Classroom Management System",
    description:
      "Attendance, grades, assignments and a student–teacher communication platform.",
    tech: ["Express.js", "React", "PostgreSQL"],
    github: "https://github.com/AyushDeuja/classroom-management-pern",
  },
  {
    title: "Job Application Tracker",
    description:
      "Tracks job applications through stages: applied, interview, offer, rejected.",
    tech: ["Next.js", "PostgreSQL"],
    github: "https://github.com/AyushDeuja/job-application-tracker",
  },
  {
    title: "Leave Management API",
    description:
      "RESTful API for employee leave requests, approvals and reporting.",
    tech: [".NET", "PostgreSQL"],
    github: "https://github.com/AyushDeuja/leave-management-api",
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science & IT (CSIT)",
    institution: "Tribhuvan University (Affiliated College)",
    period: "2023 – Present",
  },
  {
    degree: "+2 Higher Secondary – Computer Science",
    institution: "Bhanu Memorial College",
    period: "2020 – 2022",
  },
];

export const certification = {
  title: "Full Stack React & Node Developer",
  issuer: "CloveIT, Biratnagar",
  year: "2025",
};
