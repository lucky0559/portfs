import MyProfile from "@/components/MyProfile";
import AcademicJob from "@/pages/AcademicJob/AcademicJob";
import DetailsColumn from "@/pages/DetailsColumn/DetailsColumn";
import Skills from "@/pages/Skills/Skills";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row min-h-screen bg-primaryBackground p-3 xl:p-10">
        {/* <div className=""> */}
        <MyProfile />
        <DetailsColumn />
        {/* </div> */}
      </div>
      <div className="bg-secondaryBackground p-3 xl:p-10">
        <AcademicJob />
      </div>
      <div className="bg-primaryBackground">
        <Skills />
      </div>
    </>
  );
};

export default HomePage;
