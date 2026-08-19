import { projects } from "@/constants/Projects";
import { workExperiences } from "@/constants/Experience";
import { voiceNotes } from "@/constants/Voice";

const formatExperience = (): string =>
  workExperiences
    .map((entry) => {
      const period =
        entry.endDate === null
          ? `${entry.startDate} to present`
          : `${entry.startDate} to ${entry.endDate}`;
      return `- ${entry.role} at ${entry.company} (${period})`;
    })
    .join("\n");

const formatProjects = (): string =>
  projects
    .map((project) => {
      const lines = [
        `### ${project.name}`,
        `Built at: ${project.from}`,
        `Role: ${project.role}`,
        project.projectUrl ? `URL: ${project.projectUrl}` : null,
        project.description
      ].filter((line): line is string => Boolean(line));
      return lines.join("\n");
    })
    .join("\n\n");

export function buildKnowledgeBlock(): string {
  return [
    "<portfolio_data>",
    "## Work experience (newest first)",
    formatExperience(),
    "",
    "## Projects",
    formatProjects(),
    "",
    "## How Lucky talks about his work",
    voiceNotes,
    "</portfolio_data>"
  ].join("\n");
}
