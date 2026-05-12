const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export type WorkExperienceEntry = {
  company: string;
  shortName: string;
  role: string;
  startDate: string; // "YYYY-MM"
  endDate: string | null; // "YYYY-MM" or null for present
  initials: string;
  avatarColor: string;
  logoUrl?: string;
};

// Ordered newest → oldest so the timeline shows current role first
export const workExperiences: WorkExperienceEntry[] = [
  {
    company: "Asti Business Services Inc. (ABSI)",
    shortName: "ABSI",
    role: "Mid Frontend Developer",
    startDate: "2025-12",
    endDate: null,
    initials: "AB",
    avatarColor: "#1e8449",
    logoUrl: "https://ccap.ph/wp-content/uploads/2023/06/absi276x206.png"
  },
  {
    company: "Virtual Staffing Solution",
    shortName: "VSS",
    role: "Javascript Fullstack Developer",
    startDate: "2025-03",
    endDate: "2025-10",
    initials: "VS",
    avatarColor: "#7d3c98",
    logoUrl: "/vss_logo.png"
  },
  {
    company: "Vertere Global Solutions",
    shortName: "Vertere",
    role: "Junior Fullstack Developer",
    startDate: "2023-12",
    endDate: "2025-03",
    initials: "VG",
    avatarColor: "#1a5276",
    logoUrl: "/vertere_logo.png"
  },
  {
    company: "Internet Strategy Branding and Execution (ISBX)",
    shortName: "ISBX",
    role: "Javascript Fullstack Developer",
    startDate: "2021-11",
    endDate: "2023-04",
    initials: "IS",
    avatarColor: "#48594a"
  }
];

export const computeTotalYearsExperience = (): number => {
  let totalMonths = 0;
  const now = new Date();
  for (const exp of workExperiences) {
    const [sy, sm] = exp.startDate.split("-").map(Number);
    const start = new Date(sy, sm - 1);
    let end: Date;
    if (exp.endDate === null) {
      end = now;
    } else {
      const [ey, em] = exp.endDate.split("-").map(Number);
      end = new Date(ey, em - 1);
    }
    totalMonths +=
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
  }
  return Math.floor(totalMonths / 12);
};

export const formatDateRange = (
  startDate: string,
  endDate: string | null
): string => {
  const [sy, sm] = startDate.split("-").map(Number);
  const start = `${MONTHS[sm - 1]} ${sy}`;
  if (endDate === null) return `${start} – Present`;
  const [ey, em] = endDate.split("-").map(Number);
  return `${start} – ${MONTHS[em - 1]} ${ey}`;
};
