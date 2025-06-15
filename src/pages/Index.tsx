
import Layout from "../components/Layout";
import Hero3D from "../components/Hero3D";
import AboutSection from "../components/AboutSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ContactSection from "../components/ContactSection";
import ResumeSection from "../components/ResumeSection";
import BlogSection from "../components/BlogSection";
import FooterSection from "../components/FooterSection";

const Index = () => {
  return (
    <Layout>
      <Hero3D />
      <AboutSection />
      <ProjectsShowcase />
      <ContactSection />
      <ResumeSection />
      <BlogSection />
      <FooterSection />
    </Layout>
  );
};

export default Index;
