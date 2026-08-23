export interface Project {
  id: string;
  number: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  role: string;
  overview: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    number: "01",
    slug: "colon-cancer-detection",
    title: "AI Colon Cancer Detection",
    description:
      "An AI-powered healthcare platform designed to support early colon cancer detection through an intuitive interface for analyzing medical data and presenting clear diagnostic insights.",
    tags: ["React", "TypeScript", "Tailwind CSS", "AI Integration"],
    image: "/images/colon canser tablet 1.jpg",
    video: "",
    role: "Frontend Development / Diagnostic UI / Medical Visualization",
    overview:
      "Colon Cancer Detection is a specialized medical diagnostic platform built to assist healthcare professionals in evaluating clinical scans and patient metrics. The platform emphasizes clarity, high-contrast diagnostic readouts, seamless workflow navigation, and accessibility under demanding clinical conditions.",
    gallery: [
      "/images/colon canser tablet 1.jpg",
      "/images/colon canser tablet 2.jpg",
      "/images/colon canser tablet 3.jpg",
      "/images/colon canser mobile 1.jpg",
      "/images/colon canser mobile 2.jpg",
    ],
  },
  {
    id: "02",
    number: "02",
    slug: "e-commerce",
    title: "E-Commerce Platform",
    description:
      "A modern shopping experience with seamless checkout, product categories, and fully responsive layouts built for performance.",
    tags: ["React", "JavaScript", "Tailwind CSS", "REST API"],
    image: "/images/fresh cart tablet 2.png",
    video: "",
    role: "Frontend Architecture / Cart & Checkout Flow / Responsive Design",
    overview:
      "Fresh Cart is a full-featured e-commerce frontend interface built for speed and effortless user journeys. Key features include dynamic category filtering, instant search, persistent shopping cart management, interactive product modals, and a responsive checkout funnel optimized for desktop and mobile shoppers.",
    gallery: [
      "/images/fresh cart tablet 2.png",
      "/images/fresh cart tablet 1.png",
      "/images/freshCart tab&mobile1.png",
      "/images/fresh cart mobile 1.png",
      "/images/fresh cart mobile 2.png",
    ],
  },
  {
    id: "03",
    number: "03",
    slug: "yummy-menu",
    title: "Yummy Menu",
    description:
      "A recipe discovery platform that uses external APIs to help users explore meals, search for recipes, and browse dynamic food content through a clean and intuitive interface.",
    tags: ["JavaScript", "REST API", "HTML", "CSS"],
    image: "/images/yummy labtop 3.jpg",
    video: "",
    role: "Frontend Development / API Integration / Content Filtering",
    overview:
      "Yummy Menu is a culinary discovery application connected to external recipe databases. Users can search by ingredient or dish name, filter by regional cuisines, inspect detailed ingredient measurements and cooking instructions, and view video tutorials through an engaging, fluid user interface.",
    gallery: [
      "/images/yummy labtop 3.jpg",
      "/images/yummy labtop 1.jpg",
      "/images/yummy labtop 2.jpg",
      "/images/yummy mobile 1.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherProjects(currentSlug: string): Project[] {
  return projects.filter((p) => p.slug !== currentSlug);
}

export function getPrevNextProjects(currentSlug: string): {
  prev: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const total = projects.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
