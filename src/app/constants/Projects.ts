import { CardType } from "@/types/CardType";
import { ViewingDeckProject } from "@/types/ViewingProject";

const projects: ViewingDeckProject[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-26-204_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-17-606_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-06-619_com.android.vending.png"
    ],
    projectUrl: "https://peoplescience.health/"
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [],
    projectUrl: "https://www.vurple.org/"
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [],
    projectUrl: "https://staging.brasscapital.finance/"
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURLs: [],
    projectUrl: "https://www.guardgrabber.com/"
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURLs: [],
    projectUrl:
      "https://digitized-document-processing-system-of-the-cvsu-7uvnhyv6c.vercel.app/"
  },
  {
    name: "Insurance SaaS Platform",
    from: "Vertere Global Solutions",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true
  },
  {
    name: "Vooks",
    from: "Virtual Staffing Solution",
    imageURLs: [],
    projectUrl: "https://www.vooks.com/"
  },
  {
    name: "My HR",
    from: "Asti Business Services Inc. (ABSI)",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true
  },
  {
    name: "Client Back-office Web Application (Telco)",
    from: "Asti Business Services Inc. (ABSI)",
    imageURLs: [],
    projectUrl: "",
    isPrivate: true
  }
];

const cards: CardType[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/chloe/chloe-logo.png"
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/vurple/vurple.png"
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/brass-capital/brass-capital.png"
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding Execution (ISBX)",
    imageURL: "https://storage.googleapis.com/guard-grabber/guard-grabber.png"
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURL: "https://storage.googleapis.com/ddps/cvsu-logo.png"
  },
  {
    name: "Insurance SaaS Platform",
    from: "Vertere Global Solutions",
    imageURL: "",
    isPrivate: true
  },
  {
    name: "Vooks",
    from: "Virtual Staffing Solution",
    imageURL: "https://play-lh.googleusercontent.com/H-sP3vDTwEKWdD-GQ93ksbG2YJ_qjPG8Lj54thI6Is3T_PXkfHkR8ELT5um4zKAIlV3z"
  },
  {
    name: "My HR",
    from: "Asti Business Services Inc. (ABSI)",
    imageURL: "",
    isPrivate: true
  },
  {
    name: "Client Back-office Web Application (Telco)",
    from: "Asti Business Services Inc. (ABSI)",
    imageURL: "",
    isPrivate: true
  }
];

export { projects, cards };
