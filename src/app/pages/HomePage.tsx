import Menu from "@/components/Menu";
import MyProfile from "@/components/MyProfile";
import AcademicJob from "@/pages/AcademicJob/AcademicJob";
import Contact from "@/pages/Contact/Contact";
import DetailsColumn from "@/pages/DetailsColumn/DetailsColumn";
import Projects from "@/pages/Projects/Projects";
import Skills from "@/pages/Skills/Skills";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Menu />
      <div
        className="flex flex-col xl:flex-row bg-primaryBackground px-4 py-10 xl:px-10 xl:py-16 pb-24 xl:pb-16"
        id="profile"
      >
        <MyProfile />
        <DetailsColumn />
      </div>
      <div className="bg-secondaryBackground px-4 py-10 xl:px-10 xl:py-14" id="academicJob">
        <AcademicJob />
      </div>
      <div className="bg-primaryBackground" id="skills">
        <Skills />
      </div>
      <div className="bg-secondaryBackground pb-4 xl:pb-0" id="projects">
        <Projects />
      </div>
      <div className="bg-primaryBackground pb-24 xl:pb-0" id="contact">
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
