"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  SiGooglecloud,
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
  { label: "Route 53", url: "https://aws.amazon.com/route53/", abbr: "R53" },
  { label: "Google Cloud Run", url: "https://cloud.google.com/run", Icon: SiGooglecloud }
];

const otherSkills: SkillEntry[] = [
  { label: "VS Code", url: "https://code.visualstudio.com/", Icon: SiVisualstudiocode },
  { label: "Git", url: "https://git-scm.com/", Icon: SiGit },
  { label: "GitHub", url: "https://github.com/", Icon: SiGithub },
  { label: "GitLab", url: "https://gitlab.com/", Icon: SiGitlab },
  { label: "Bitbucket", url: "https://bitbucket.org/", Icon: SiBitbucket },
  { label: "Jira", url: "https://www.atlassian.com/software/jira", Icon: SiJira },
  { label: "Trello", url: "https://trello.com/", Icon: SiTrello },
  { label: "Vercel", url: "https://vercel.com/", Icon: SiVercel },
  { label: "Claude", url: "https://claude.ai/", abbr: "AI" }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } }
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 }
  }
};

type SkillPillProps = SkillEntry;

const SkillPill = ({ label, url, Icon, abbr }: SkillPillProps) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      variants={shouldReduce ? {} : pillVariants}
      whileHover={shouldReduce ? {} : { y: -3, borderColor: "rgba(206,206,90,0.35)" }}
      whileTap={shouldReduce ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-pastelPink/18 bg-secondaryBackground/50 hover:bg-secondaryBackground/80 hover:border-greenApple/30 hover:shadow-md hover:shadow-black/20 transition-all duration-200 no-underline cursor-pointer"
    >
      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
        {Icon ? (
          <Icon
            size={15}
            className="text-pastelPink/70 group-hover:text-greenApple/90 transition-colors duration-200"
            aria-hidden="true"
          />
        ) : (
          <span
            className="text-pastelPink/50 group-hover:text-greenApple/80 font-LouisBold text-[9px] tracking-widest transition-colors duration-200"
            aria-hidden="true"
          >
            {abbr}
          </span>
        )}
      </span>
      <span className="text-light/75 group-hover:text-light font-Louis text-[11px] tracking-wide whitespace-nowrap transition-colors duration-200">
        {label}
      </span>
    </motion.a>
  );
};

type SkillGroupProps = {
  title: string;
  skills: SkillEntry[];
  accentColor?: string;
};

const SkillGroup = ({ title, skills }: SkillGroupProps) => {
  const shouldReduce = useReducedMotion();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-greenApple font-LouisBold text-sm xl:text-base tracking-wide">
          {title}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-greenApple/20 to-transparent" />
      </div>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={shouldReduce ? {} : containerVariants}
        initial={shouldReduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {skills.map(skill => (
          <SkillPill key={skill.label} {...skill} />
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const shouldReduce = useReducedMotion();
  return (
    <div>
      {/* Section title */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-12"
      >
        <h2 className="text-light font-LouisBold text-3xl md:text-5xl xl:text-6xl leading-tight">
          Skills
        </h2>
        <p className="text-light/75 font-LouisBold text-xl xl:text-2xl mt-2 max-w-sm">
          Technologies and tools I work with daily
        </p>
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-10">
        <SkillGroup title="Front-End" skills={frontendSkills} />
        <SkillGroup title="Back-End" skills={backendSkills} />
        <SkillGroup title="Other Tools" skills={otherSkills} />
      </div>
    </div>
  );
};

export default Skills;
