export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "FRONTEND DEVELOPMENT",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
    ],
  },
  {
    title: "STYLING & UI",
    skills: [
      "Tailwind CSS",
      "Responsive Web Design",
      "UI Implementation",
    ],
  },
  {
    title: "INTEGRATION & TOOLS",
    skills: [
      "REST APIs",
      "API Integration",
      "Git",
      "GitHub",
    ],
  },
];
