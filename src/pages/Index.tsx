
import Layout from "../components/Layout";
import Hero3D from "../components/Hero3D";
import AboutSection from "../components/AboutSection";
import AlbumProjectsSection from "../components/AlbumProjectsSection";
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
      <ContactSection />
      <ResumeSection />
      <BlogSection />
      <FooterSection />
    </Layout>
  );
};

export default Index;
