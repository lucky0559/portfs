import Launcher from "@/components/Chat/Launcher";
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
    <span>{number}</span>
    {label}
  </div>
);

const HomePage = () => {
  return (
    <>
      <Menu />

      <section id="profile" className="hero-section">
        <div className="section-shell hero-layout">
          <MyProfile />
          <DetailsColumn />
        </div>
      </section>

      <section id="academicJob" className="section-panel section-panel--alt section-spacing">
        <div className="section-shell">
          <SectionLabel number="02" label="Background" />
          <AcademicJob />
        </div>
      </section>

      <section id="skills" className="section-panel section-spacing">
        <div className="section-shell">
          <SectionLabel number="03" label="Expertise" />
          <Skills />
        </div>
      </section>

      <section id="projects" className="section-panel section-panel--alt section-spacing">
        <div className="section-shell">
          <SectionLabel number="04" label="Work" />
          <Projects />
        </div>
      </section>

      <section id="contact" className="section-panel section-spacing contact-section">
        <div className="section-shell">
          <SectionLabel number="05" label="Connect" />
          <Contact />
          <footer className="site-footer">
            <p>Lucky Angelo Rabosa · Software developer</p>
            <span className="site-footer__mark">&lt;/&gt;</span>
          </footer>
        </div>
      </section>

      <Launcher />
    </>
  );
};

export default HomePage;
