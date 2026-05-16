import Menu from "@/components/Menu";
import MyProfile from "@/components/MyProfile";
import AcademicJob from "@/pages/AcademicJob/AcademicJob";
import Contact from "@/pages/Contact/Contact";
import DetailsColumn from "@/pages/DetailsColumn/DetailsColumn";
import Projects from "@/pages/Projects/Projects";
import Skills from "@/pages/Skills/Skills";
import React from "react";

const SectionLabel = ({ number, label }: { number: string; label: string }) => (
  <div className="section-label">
    <span className="text-greenApple/40">{number}</span>
    {label}
  </div>
);

const HomePage = () => {
  return (
    <>
      <Menu />

      {/* Hero — Profile */}
      <section
        id="profile"
        className="relative bg-primaryBackground px-4 py-12 xl:px-16 xl:py-20 min-h-screen flex items-center"
      >
        <div className="relative z-10 w-full flex flex-col xl:flex-row xl:items-center gap-10 xl:gap-16 max-w-7xl mx-auto">
          <MyProfile />
          <DetailsColumn />
        </div>
      </section>

      {/* Academic & Job */}
      <section
        id="academicJob"
        className="relative bg-secondaryBackground px-4 py-14 xl:px-16 xl:py-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="02" label="Background" />
          <AcademicJob />
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="relative bg-primaryBackground px-4 py-14 xl:px-16 xl:py-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="03" label="Expertise" />
          <Skills />
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative bg-secondaryBackground px-4 py-14 xl:px-16 xl:py-20 pb-8 xl:pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="04" label="Work" />
          <Projects />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative bg-primaryBackground px-4 py-14 xl:px-16 xl:py-20 pb-28 xl:pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="05" label="Connect" />
          <Contact />
        </div>
      </section>
    </>
  );
};

export default HomePage;
