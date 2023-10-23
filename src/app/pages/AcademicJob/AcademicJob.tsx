"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";

const AcademicJob = () => {
  return (
    <div className="xl:flex justify-center">
      <Academic />
      <Job />
    </div>
  );
};

export default AcademicJob;
