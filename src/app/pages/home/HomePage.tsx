import React from "react";
import MyProfile from "./MyProfile";
import DetailsColumn from "./DetailsColumn";
import AcademicJob from "./AcademicJob";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row min-h-screen bg-primaryBackground p-3 xl:p-10">
        {/* <div className=""> */}
        <MyProfile />
        <DetailsColumn />
        {/* </div> */}
      </div>
      <div className="bg-secondaryBackground  p-3 xl:p-10">
        <AcademicJob />
      </div>
    </>
  );
};

export default HomePage;
