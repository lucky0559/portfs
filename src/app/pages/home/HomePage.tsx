import React from "react";
import MyProfile from "./MyProfile";
import DetailsColumn from "./DetailsColumn";

const HomePage = () => {
  return (
    <div className="flex mobile:flex-col laptop:flex-row min-h-screen bg-primaryBackground laptop:p-10 mobile:p-3">
      <MyProfile />
      <DetailsColumn />
    </div>
  );
};

export default HomePage;
