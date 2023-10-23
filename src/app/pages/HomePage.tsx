import Menu from "@/components/Menu";
import MyProfile from "@/components/MyProfile";
import AcademicJob from "@/pages/AcademicJob/AcademicJob";
import DetailsColumn from "@/pages/DetailsColumn/DetailsColumn";
import Projects from "@/pages/Projects/Projects";
import Skills from "@/pages/Skills/Skills";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Menu />
      <div
        className="flex flex-col xl:flex-row min-h-screen bg-primaryBackground p-3 xl:p-10"
        id="profile"
      >
        <MyProfile />
        <DetailsColumn />
      </div>
      <div className="bg-secondaryBackground p-3 xl:p-10" id="academicJob">
        <AcademicJob />
      </div>
      <div className="bg-primaryBackground" id="skills">
        <Skills />
      </div>
      <div className="bg-secondaryBackground" id="projects">
        <Projects />
      </div>
    </>
  );
};

export default HomePage;
