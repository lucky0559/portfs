import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaFolderOpen,
  FaUser
} from "react-icons/fa";

const Menu = () => {
  const liClassname =
    "relative list-none w-52 p-4 text-primaryBackground bg-light duration-500 hover:bg-primaryBackground hover:text-light hover:-translate-x-50-px before:text-light before:flex before:justify-center before:items-center before:absolute before:top-0 before:-left-10 before:w-10 before:h-full before:bg-menuPrimary before:origin-right before:skew-y-45 before:duration-500 hover:before:bg-light hover:before:text-primaryBackground after:content-[''] after:absolute after:-top-10 after:left-0 after:w-full after:h-10 after:bg-menuLightPrimary after:origin-bottom after:skew-x-45 after:duration-500 hover:after:bg-light cursor-pointer";

  const aClassname =
    "uppercase tracking-wider duration-400 m-0 block w-full h-full";

  const mobileItems = [
    { label: "Profile", href: "#profile", Icon: FaUser },
    { label: "Academic/Job", href: "#academicJob", Icon: FaBriefcase },
    { label: "Skills", href: "#skills", Icon: FaCode },
    { label: "Projects", href: "#projects", Icon: FaFolderOpen },
    { label: "Contact", href: "#contact", Icon: FaEnvelope }
  ];

  return (
    <>
      {/* Desktop: original 3D skewed floating panel — z-index must be hardcoded so Tailwind generates the classes */}
      <div className="hidden xl:block fixed bottom-15% right-8 z-20">
        <ul className="text-light relative -skew-y-15">
          <li className={`${liClassname} z-[5]`}>
            <a href="#profile" className={aClassname}>Profile</a>
          </li>
          <li className={`${liClassname} z-[4]`}>
            <a href="#academicJob" className={aClassname}>Academic/Job</a>
          </li>
          <li className={`${liClassname} z-[3]`}>
            <a href="#skills" className={aClassname}>Skills</a>
          </li>
          <li className={`${liClassname} z-[2]`}>
            <a href="#projects" className={aClassname}>Projects</a>
          </li>
          <li className={`${liClassname} z-[1]`}>
            <a href="#contact" className={aClassname}>Contact</a>
          </li>
        </ul>
      </div>

      {/* Mobile / tablet: fixed bottom navigation bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-20 bg-primaryBackground/95 backdrop-blur-md border-t border-pastelPink/20">
        <nav className="flex justify-around items-center py-2 px-1">
          {mobileItems.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center gap-1 text-pastelPink hover:text-light transition-colors duration-200 flex-1 py-1"
            >
              <Icon size={17} />
              <span className="font-Louis text-[8px] text-center leading-tight w-full text-center">
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Menu;
