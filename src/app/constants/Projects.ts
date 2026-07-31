import { CardType } from "@/types/CardType";
import { ViewingDeckProject } from "@/types/ViewingProject";

const projects: ViewingDeckProject[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-26-204_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-17-606_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-06-619_com.android.vending.png"
    ],
    projectUrl: "https://peoplescience.health/",
    role: "Full-Stack",
    description:
      "Chloe is a decentralized clinical trial platform by People Science that enables research-grade health studies outside traditional clinical settings. Built as a mobile-first app, it supports clinical outcome assessments via validated questionnaires, real-time physiological data from wearables (Oura, Garmin, Apple Watch), biomarker sample collection through CLIA/CAP-accredited labs, and multimedia uploads from participants' smartphones. The platform is HIPAA and GDPR compliant with end-to-end AES-256 encryption, and serves health and wellness companies seeking clinical evidence without traditional trial infrastructure."
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [
      "https://cdn.soft112.com/vurple-ios/00/00/0H/TY/00000HTYNJ/pad_screenshot_7A9Y6I5C2V.png",
      "https://cdn.soft112.com/vurple-ios/00/00/0H/TY/00000HTYNJ/pad_screenshot_6S8G7X1E9D.png",
      "https://cdn.soft112.com/vurple-ios/00/00/0H/TY/00000HTYNJ/pad_screenshot_D3K3E8Y5H3.png"
    ],
    projectUrl: "https://www.vurple.org/",
    role: "Full-Stack",
    description:
      "Vurple is a civic engagement platform — \"The Virtual Town Hall\" — that bridges the gap between citizens and elected officials. The app enables real-time live streaming where constituents can join officials' broadcasts and interact directly. During livestreams, the platform surfaces live data insights including viewer demographics, trending questions, top cities, and occupations to give officials a clear picture of who they're reaching. Built on a non-partisan principle, Vurple's mission (#BridgeTheGap) is to improve transparency and communication in local communities. The name itself merges the red and blue of the American flag into purple — a symbol of unity and shared purpose."
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [],
    projectUrl: "https://staging.brasscapital.finance/",
    role: "Frontend",
    description:
      "Brass Capital is a blockchain showcase platform built to present and demonstrate their blockchain infrastructure and financial technology to investors and stakeholders. The platform serves as a public-facing front for their blockchain ecosystem — highlighting the technology's capabilities, architecture, and value proposition in the capital and finance space."
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [],
    projectUrl: "https://www.guardgrabber.com/",
    role: "Full-Stack",
    description:
      "Guard Grabber is an on-demand marketplace that connects individuals and organizations in need of security services with licensed security professionals. The platform streamlines the entire booking process — from discovery to scheduling — through a patented matching system and custom dashboards for professionals to manage their bookings and grow their client base. Founded in San Francisco in 2018, Guard Grabber's proprietary technology cuts time and cost for both sides of the marketplace, making professional security services more accessible and efficient."
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURLs: [],
    projectUrl:
      "https://digitized-document-processing-system-of-the-cvsu-7uvnhyv6c.vercel.app/",
    role: "Full-Stack",
    description:
      "A freelance web system developed for Cavite State University (CvSU) to digitize and streamline the faculty workload document processing workflow. The system replaces manual, paper-based processes with a centralized digital platform where faculty members can submit their workload documents — covering teaching loads, research assignments, extension services, and administrative duties — for review and approval by department heads and administrators. It automates workload computation, tracks submission statuses in real time, and generates digital reports, significantly reducing paperwork and processing time for the university's academic departments."
  },
  {
    name: "PruServices",
    from: "Vertere Global Solutions",
    imageURLs: ["/pruservices-onboarding.png"],
    projectUrl: "",
    isPrivate: false,
    isSaas: true,
    role: "Backend",
    description:
      "A private, enterprise-grade SaaS platform built for a Philippine insurance company (Pru Life UK). The platform serves as an online customer portal where policyholders can manage their insurance accounts anytime, anywhere — covering policy details and financial values, online payment and credit card enrollment, beneficiary updates, partial withdrawals, and document and payment history. The system spans multiple insurance product lines including life protection, health/critical illness coverage, investment-linked products, and Takaful. Built as a hosted B2C web application with secure login via policy number and registered email."
  },
  {
    name: "B&O Safety And Care",
    from: "Freelance",
    imageURLs: [
      "/bo-safety-hero.png",
      "/bo-safety-services.png",
      "/bo-safety-cta.png"
    ],
    projectUrl: "https://www.bosafetyandcare.com/",
    role: "Frontend",
    description:
      "B&O Safety and Care is a Dutch private security company offering recognized, round-the-clock protection for businesses, institutions, and communities. The site showcases the company's core services — event security, hospitality/venue security, object (property) security, and personal security — backed by more than a decade of experience, alongside consultation booking and WhatsApp contact options."
  },
  {
    name: "Vooks",
    from: "Virtual Staffing Solution",
    imageURLs: ["/vooks-hero.png", "/vooks-about.png", "/vooks-teachers.png"],
    projectUrl: "https://www.vooks.com/",
    role: "Full-Stack",
    description:
      "Vooks is an award-winning online library of animated, read-aloud storybooks for kids, turning physical picture books into gently narrated videos with read-along highlighted text, music, and sound effects. Beyond the core streaming library, the platform includes classroom tools and educator pricing (used by over 1 million teachers), a library-partnership program, activities, and a \"Vooks Creator\" offering for authors and publishers — all aimed at making screen time feel like storytime. Developed across Web, Mobile, and TV platforms so families can watch and read along wherever they are."
  },
  {
    name: "Himis",
    from: "Freelance",
    imageURLs: ["/himis-hero.png", "/himis-search.png", "/himis-industries.png"],
    projectUrl: "https://himis.nl/",
    role: "Frontend",
    description:
      "HIMIS is a Dutch platform (based in Hoevelaken, Netherlands) that connects freelance interim managers and consultants with organizations across logistics, operations, and business support. The site pairs an interim-management job marketplace — job search, vacancy listings, and separate registration flows for job seekers and employers — with service pages covering Interim Management, Business Management, and Consultancy, plus an industry-knowledge section spanning supply chain, operations, planning, procurement, production, and logistics."
  },
  {
    name: "Visual Blueprint",
    from: "Freelance",
    imageURLs: [
      "/visual-blueprint-hero.png",
      "/visual-blueprint-services.png",
      "/visual-blueprint-portfolio.png"
    ],
    projectUrl: "https://www.visual-blueprint.com/",
    role: "Frontend",
    description:
      "Visual Blueprint is a Netherlands-based (Tilburg) 3D visualization studio for architects, developers, and real estate professionals. The site showcases the studio's core services — Interior Design Visualization, 360-Degree Virtual Tours, 3D Blueprint conversion (turning technical drawings into dimensionally accurate 3D models), and Exterior Design Visualization — alongside a portfolio of rendered projects and client testimonials."
  },
  {
    name: "Pa-Abogado (Corporate Website)",
    from: "Freelance",
    imageURLs: [
      "/panotaryo-hero.png",
      "/panotaryo-services.png",
      "/panotaryo-lawyers.png"
    ],
    projectUrl: "",
    role: "Frontend",
    description:
      "The corporate marketing site for Pa-Abogado PH, a Philippine platform for online notarization and legal consultation. Built with Next.js and Tailwind, the site introduces the service's core offerings — remote notarization via secure video conference, licensed-lawyer consultations, and online legal support — and highlights the registered lawyers available on the platform. It also walks visitors through the end-to-end workflow: clients upload documents and join sessions from a mobile app while lawyers verify identity and conduct notarization from a desktop browser, with all actions securely logged for compliance."
  },
  {
    name: "Pa-Abogado (Admin Website)",
    from: "Freelance",
    imageURLs: ["/panotaryo-admin-login.png", "/panotaryo-admin-dashboard.png"],
    projectUrl: "",
    role: "Frontend",
    description:
      "The internal back-office admin panel for Pa-Abogado PH, built with Next.js, TanStack Query/Table, Zustand, and shadcn/ui, authenticated via OTP email login. Administrators manage the full notarization platform from a tabbed dashboard — Users, Witnesses, Lawyers/Legal, Admins, Lawyer Categories, and Lawyer Applicants — with a stats overview covering active lawyers, registered users, total bookings, and chat, video, and notarization session counts. It also handles lawyer application review/approval, witness status updates, admin account management, and admin profile settings."
  },
  {
    name: "Pa-Abogado (Lawyer Website)",
    from: "Freelance",
    imageURLs: ["/panotaryo-lawyer-login.png", "/panotaryo-lawyer-activities.png"],
    projectUrl: "",
    role: "Frontend",
    description:
      "The lawyer-facing web portal for Pa-Abogado PH, where licensed lawyers manage their client caseload and conduct sessions. Built with Next.js, TanStack Query/Table, Agora RTC (video/voice), Socket.IO (real-time chat), and pdf-lib/pdfjs for document handling, with OTP email authentication. The Activities dashboard is organized into Consult Now, Consult Later, Chat, and Notarization tabs, each showing scheduled sessions, client names, and live status (Ongoing, Upcoming, Pending, Finished) with a one-click Join into the video consultation or remote notarization room."
  },
  {
    name: "My HR",
    from: "Asti Business Services Inc. (ABSI)",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true,
    isSaas: true,
    role: "Frontend",
    description:
      "My HR is a comprehensive SaaS-based Human Resource Management System designed to streamline and automate end-to-end HR processes for organizations. It covers the full employee lifecycle — from onboarding and daily attendance tracking, to managing benefits, allowances, and leave requests. The platform handles performance evaluations and disciplinary workflows, and culminates in a fully automated payroll processing engine that computes salaries, deductions, government contributions (SSS, PhilHealth, Pag-IBIG), and generates payslips. Built to scale with multi-tenant architecture, My HR empowers HR teams to manage their workforce efficiently through a centralized, role-based web application."
  },
  {
    name: "Cineserye",
    from: "Freelance",
    imageURLs: [
      "/cineserye-hero.png",
      "/cineserye-catalog.png",
      "/cineserye-pricing.png"
    ],
    projectUrl: "",
    role: "Frontend",
    description:
      "Cineserye is a Filipino video-on-demand streaming platform for teleseryes, movies, and exclusive originals. Built with Next.js and Redux Toolkit, the site features a Netflix-style browsing experience — a rotating featured-title hero, Top 10 and \"Only On Cineserye\" content rails, genres, cast, and tags — alongside a full membership system with tiered subscription plans (Basic, Premium, Standard), checkout/invoicing flow, watchlists, a companion merchandise store, and a blog."
  },
  {
    name: "Cineserye (Admin Website)",
    from: "Freelance",
    imageURLs: [
      "/cineserye-admin-login.png",
      "/cineserye-admin-dashboard.png",
      "/cineserye-admin-titles.png"
    ],
    projectUrl: "",
    role: "Frontend",
    description:
      "The internal content-management back office for Cineserye, built with Next.js, Zustand, and shadcn/ui, authenticated via OTP email login (with a separate super-admin path). Content teams manage the entire catalog — Titles, Movies, Series, Seasons, Episodes, Collections/Rows, Genres, Artists (Cast & Crew), Availability rules per region, Regions, Languages, Age Ratings, and Content Warnings — plus Subscription Plans and PPV pricing, admin user management, and a dashboard with live-style stats (active subscribers, PPV purchases, revenue, playback errors), recent activity, and system health monitoring."
  },
  {
    name: "Vendor Service Access Hub (VSAH)",
    from: "Asti Business Services Inc. (ABSI)",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true,
    isSaas: true,
    role: "Frontend",
    description:
      "A private back-office web application built for Globe, a Philippine telecommunications company, serving as a vendor service access and ticketing hub. Vendors raise tickets for work orders, which are routed through a multi-level approver workflow before execution. The system includes a user management module with a dedicated blacklist feature, Arnitikos, that lets administrators flag, search, and manage blacklisted individuals to prevent them from being engaged for future work orders."
  },
  {
    name: "Stock Investment Market System",
    from: "Asti Business Services Inc. (ABSI)",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true,
    role: "Frontend",
    description:
      "A private, enterprise-grade Stock Investment Market System developed for an insurance company client. The platform enables the company to manage and monitor stock investment portfolios, process trade orders, track real-time market data, and generate financial reporting dashboards — all within a secure, role-based internal system tailored for institutional investment operations."
  }
];

const cards: CardType[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/chloe/chloe-logo.png",
    role: "Full-Stack"
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/vurple/vurple.png",
    role: "Full-Stack"
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/brass-capital/brass-capital.png",
    role: "Frontend"
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/guard-grabber/guard-grabber.png",
    role: "Full-Stack"
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURL: "https://storage.googleapis.com/ddps/cvsu-logo.png",
    role: "Full-Stack"
  },
  {
    name: "PruServices",
    from: "Vertere Global Solutions",
    imageURL: "/pruservices-logo.png",
    isPrivate: false,
    isSaas: true,
    role: "Backend"
  },
  {
    name: "B&O Safety And Care",
    from: "Freelance",
    imageURL: "/bo-safety-logo.png",
    role: "Frontend"
  },
  {
    name: "Vooks",
    from: "Virtual Staffing Solution",
    imageURL: "https://play-lh.googleusercontent.com/H-sP3vDTwEKWdD-GQ93ksbG2YJ_qjPG8Lj54thI6Is3T_PXkfHkR8ELT5um4zKAIlV3z",
    role: "Full-Stack"
  },
  {
    name: "Himis",
    from: "Freelance",
    imageURL: "/himis-logo.png",
    role: "Frontend"
  },
  {
    name: "Visual Blueprint",
    from: "Freelance",
    imageURL: "/visual-blueprint-logo.png",
    role: "Frontend"
  },
  {
    name: "Pa-Abogado (Corporate Website)",
    from: "Freelance",
    imageURL: "/panotaryo-logo.png",
    role: "Frontend"
  },
  {
    name: "Pa-Abogado (Admin Website)",
    from: "Freelance",
    imageURL: "/panotaryo-logo.png",
    role: "Frontend"
  },
  {
    name: "Pa-Abogado (Lawyer Website)",
    from: "Freelance",
    imageURL: "/panotaryo-logo.png",
    role: "Frontend"
  },
  {
    name: "My HR",
    from: "Asti Business Services Inc. (ABSI)",
    imageURL: "",
    isPrivate: true,
    isSaas: true,
    role: "Frontend"
  },
  {
    name: "Cineserye",
    from: "Freelance",
    imageURL: "/cineserye-logo.png",
    role: "Frontend"
  },
  {
    name: "Cineserye (Admin Website)",
    from: "Freelance",
    imageURL: "/cineserye-logo.png",
    role: "Frontend"
  },
  {
    name: "Vendor Service Access Hub (VSAH)",
    from: "Asti Business Services Inc. (ABSI)",
    imageURL: "",
    isPrivate: true,
    isSaas: true,
    role: "Frontend"
  },
  {
    name: "Stock Investment Market System",
    from: "Asti Business Services Inc. (ABSI)",
    imageURL: "",
    isPrivate: true,
    role: "Frontend"
  }
];

export { projects, cards };
