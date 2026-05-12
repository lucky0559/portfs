"use client";

import { openInNewTabHandler } from "@/lib/hooks/useOpenNewTab";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaReact } from "react-icons/fa";
import {
  SiAmazondynamodb,
  SiAmazons3,
  SiAmazonaws,
  SiAxios,
  SiBitbucket,
  SiCss3,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJira,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReactquery,
  SiStyledcomponents,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode
} from "react-icons/si";

type SkillEntry = {
  label: string;
  url: string;
  Icon?: IconType;
  abbr?: string;
};

const frontendSkills: SkillEntry[] = [
  { label: "React JS", url: "https://react.dev/", Icon: FaReact },
  { label: "Next.js", url: "https://nextjs.org/", Icon: SiNextdotjs },
  { label: "React Native", url: "https://reactnative.dev/", Icon: FaReact },
  { label: "TypeScript", url: "https://www.typescriptlang.org/", Icon: SiTypescript },
  { label: "Tailwind CSS", url: "https://tailwindcss.com/", Icon: SiTailwindcss },
  { label: "Styled Components", url: "https://styled-components.com/", Icon: SiStyledcomponents },
  { label: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", Icon: SiHtml5 },
  { label: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", Icon: SiCss3 },
  { label: "TanStack Query", url: "https://tanstack.com/query", Icon: SiReactquery },
  { label: "TanStack Form", url: "https://tanstack.com/form", abbr: "TF" },
  { label: "Zustand", url: "https://zustand-demo.pmnd.rs/", abbr: "ZST" },
  { label: "Zod", url: "https://zod.dev/", abbr: "ZOD" },
  { label: "shadcn/ui", url: "https://ui.shadcn.com/", abbr: "UI" },
  { label: "Axios", url: "https://axios-http.com/docs/intro", Icon: SiAxios }
];

const backendSkills: SkillEntry[] = [
  { label: "NestJS", url: "https://nestjs.com/", Icon: SiNestjs },
  { label: "Node.js", url: "https://nodejs.org/", Icon: SiNodedotjs },
  { label: "Express", url: "https://expressjs.com/", Icon: SiExpress },
  { label: "TypeScript", url: "https://www.typescriptlang.org/", Icon: SiTypescript },
  { label: "PostgreSQL", url: "https://www.postgresql.org/", Icon: SiPostgresql },
  { label: "Firebase", url: "https://firebase.google.com/", Icon: SiFirebase },
  { label: "Firestore", url: "https://firebase.google.com/docs/firestore", Icon: SiFirebase },
  { label: "AWS DynamoDB", url: "https://aws.amazon.com/dynamodb/", Icon: SiAmazondynamodb },
  { label: "AWS S3", url: "https://aws.amazon.com/s3/", Icon: SiAmazons3 },
  { label: "Elastic Beanstalk", url: "https://aws.amazon.com/elasticbeanstalk/", Icon: SiAmazonaws },
  { label: "Route 53", url: "https://aws.amazon.com/route53/", abbr: "R53" }
];

const otherSkills: SkillEntry[] = [
  { label: "VS Code", url: "https://code.visualstudio.com/", Icon: SiVisualstudiocode },
  { label: "Git", url: "https://git-scm.com/", Icon: SiGit },
  { label: "GitHub", url: "https://github.com/", Icon: SiGithub },
  { label: "GitLab", url: "https://gitlab.com/", Icon: SiGitlab },
  { label: "Bitbucket", url: "https://bitbucket.org/", Icon: SiBitbucket },
  { label: "Jira", url: "https://www.atlassian.com/software/jira", Icon: SiJira },
  { label: "Trello", url: "https://trello.com/", Icon: SiTrello },
  { label: "Vercel", url: "https://vercel.com/", Icon: SiVercel }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } }
};

type SkillCardProps = SkillEntry;

const SkillCard = ({ label, url, Icon, abbr }: SkillCardProps) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -6, scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => openInNewTabHandler(url)}
    className="flex flex-col items-center justify-center gap-2 w-20 h-20 bg-primaryBackground/70 border border-pastelPink/20 rounded-2xl cursor-pointer hover:border-pastelPink/60 hover:bg-primaryBackground hover:shadow-lg hover:shadow-pastelPink/10 transition-colors duration-200"
  >
    {Icon ? (
      <Icon size={22} className="text-light" />
    ) : (
      <span className="text-light font-LouisBold text-[11px] tracking-wider">{abbr}</span>
    )}
    <span className="text-pastelPink font-Louis text-[9px] text-center leading-tight px-1">
      {label}
    </span>
  </motion.div>
);

type SkillGroupProps = {
  title: string;
  skills: SkillEntry[];
};

const SkillGroup = ({ title, skills }: SkillGroupProps) => (
  <div className="mb-10">
    <p className="text-greenApple font-LouisBold text-lg xl:text-2xl mb-5">{title}</p>
    <motion.div
      className="flex flex-wrap gap-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {skills.map((skill) => (
        <SkillCard key={skill.label} {...skill} />
      ))}
    </motion.div>
  </div>
);

const Skills = () => {
  return (
    <div className="p-8 xl:p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="text-light font-LouisBold text-2xl md:text-4xl xl:text-6xl">
          Skills
        </span>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-16">
        <SkillGroup title="Front-End" skills={frontendSkills} />
        <SkillGroup title="Back-End" skills={backendSkills} />
        <SkillGroup title="Other Tools" skills={otherSkills} />
      </div>
    </div>
  );
};

export default Skills;
