import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransitionReveal from "@/components/PageTransitionReveal";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import {
  getProjectBySlug,
  getOtherProjects,
  getPrevNextProjects,
  getAllProjectSlugs,
} from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Hagar Atef",
    };
  }

  return {
    title: `${project.title} — Case Study | Hagar Atef`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = getOtherProjects(slug);
  const { prev: prevProject, next: nextProject } = getPrevNextProjects(slug);

  return (
    <>
      <PageTransitionReveal />
      <Navbar isVisible={true} />

      <main className="min-h-screen bg-cream selection:bg-olive selection:text-charcoal pt-28 pb-16 px-6 md:px-10 lg:px-16 flex justify-center">
        <div className="w-full max-w-[1400px]">
          <ProjectDetailContent
            project={project}
            otherProjects={otherProjects}
            prevProject={prevProject}
            nextProject={nextProject}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
