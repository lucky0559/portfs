import React from "react";
import MyProfile from "./MyProfile";
import DetailsColumn from "./DetailsColumn";

const HomePage = () => {
  return (
    <div className="flex flex-row">
      <MyProfile />
      <DetailsColumn />
    </div>
  );
};

export default HomePage;
