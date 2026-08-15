import { FaBook, FaChalkboard, FaGraduationCap } from "react-icons/fa";

const degrees = [
  {
    Icon: FaGraduationCap,
    title: "Bachelor of Science in Information Technology",
    school: "Cavite State University Main – Indang Campus"
  },
  {
    Icon: FaBook,
    title: "Higher Secondary Certificate",
    school: "Tagaytay City Science National High School"
  },
  {
    Icon: FaChalkboard,
    title: "Secondary School Certificate",
    school: "Maitim 2nd Elementary School Tagaytay"
  }
];

const Academic = () => {
  return (
    <div className="journey-block">
      <div className="block-heading">
        <span className="block-heading__index">01</span>
        <h3>Academic foundation</h3>
      </div>

      <ol className="education-list">
        {degrees.map(({ Icon, title, school }) => (
          <li className="education-item" key={title}>
            <span className="education-marker" aria-hidden="true">
              <Icon size={15} />
            </span>
            <div>
              <p className="education-title">{title}</p>
              <p className="education-school">{school}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Academic;
