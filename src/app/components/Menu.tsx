const Menu = () => {
  const liClassname =
    "relative list-none w-52 p-4 text-primaryBackground bg-light duration-500 hover:bg-primaryBackground hover:text-light hover:-translate-x-50-px before:text-light before:flex before:justify-center before:items-center before:absolute before:top-0 before:-left-10 before:w-10 before:h-full before:bg-menuPrimary before:origin-right before:skew-y-45 before:duration-500 hover:before:bg-light hover:before:text-primaryBackground after:content-[''] after:absolute after:-top-10 after:left-0 after:w-full after:h-10 after:bg-menuLightPrimary after:origin-bottom after:skew-x-45 after:duration-500 hover:after:bg-light cursor-pointer";

  const aClassname =
    "uppercase tracking-wider duration-400 m-0 block w-full h-full";

  return (
    <div className="fixed bottom-15% right-8 z-10">
      <ul className="text-light relative -skew-y-15">
        <li className={`${liClassname} z-[4] before:content-profile`}>
          <a href="#profile" className={aClassname}>
            Profile
          </a>
        </li>
        <li className={`${liClassname} z-[3] before:content-experience`}>
          <a href="#academicJob" className={aClassname}>
            Academic/Job
          </a>
        </li>
        <li className={`${liClassname} z-[2] before:content-skills`}>
          <a href="#skills" className={aClassname}>
            Skills
          </a>
        </li>
        <li className={`${liClassname} z-[1] before:content-projects`}>
          <a href="#projects" className={aClassname}>
            Projects
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
