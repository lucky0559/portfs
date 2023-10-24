import { CardType } from "@/types/CardType";
import { ViewingDeckProject } from "@/types/ViewingProject";

const projects: ViewingDeckProject[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding and Execution",
    imageURLs: [
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-26-204_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-17-606_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-06-619_com.android.vending.png"
    ],
    projectUrl: "https://peoplescience.health/"
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding and Execution",
    imageURLs: [],
    projectUrl: "https://www.vurple.org/"
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding and Execution",
    imageURLs: [],
    projectUrl: "https://staging.brasscapital.finance/"
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding and Execution",
    imageURLs: [],
    projectUrl: "https://www.guardgrabber.com/"
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURLs: [],
    projectUrl:
      "https://digitized-document-processing-system-of-the-cvsu-7uvnhyv6c.vercel.app/"
  }
];

const cards: CardType[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding and Execution",
    imageURL: "https://storage.googleapis.com/chloe/chloe-logo.png"
  },
  {
    name: "Vurple",
    from: "Internet Strategy Branding and Execution",
    imageURL: "https://storage.googleapis.com/vurple/vurple.png"
  },
  {
    name: "Brass Capital",
    from: "Internet Strategy Branding and Execution",
    imageURL: "https://storage.googleapis.com/brass-capital/brass-capital.png"
  },
  {
    name: "Guard Grabber",
    from: "Internet Strategy Branding and Execution",
    imageURL: "https://storage.googleapis.com/guard-grabber/guard-grabber.png"
  },
  {
    name: "Digitized Document Processing System of the CvSU Faculty Workload",
    from: "Freelance",
    imageURL: "https://storage.googleapis.com/ddps/cvsu-logo.png"
  }
];

export { projects, cards };
