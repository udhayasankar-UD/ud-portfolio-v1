
import Layout from "../components/Layout";
import Hero3D from "../components/Hero3D";
import AboutSection from "../components/AboutSection";
import AlbumProjectsSection from "../components/AlbumProjectsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import ResumeSection from "../components/ResumeSection";
import BlogSection from "../components/BlogSection";
import FooterSection from "../components/FooterSection";

const Index = () => {
  return (
    <Layout>
      <Hero3D />
      <AboutSection />
      <AlbumProjectsSection />
      <div id="projects-grid">
        <ProjectsSection />
      </div>
      <ContactSection />
      <ResumeSection />
      <BlogSection />
      <FooterSection />
    </Layout>
  );
};

export default Index;
