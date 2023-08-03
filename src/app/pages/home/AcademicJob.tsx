import React from "react";
import Academic from "./AcademicJob/Academic";
import Job from "./AcademicJob/Job";

const AcademicJob = () => {
  return (
    <div className="xl:flex justify-center">
      <Academic />
      <Job />
    </div>
  );
};

export default AcademicJob;
