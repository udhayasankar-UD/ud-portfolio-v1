import Layout from "../components/layout/Layout";
import Hero3D from "../components/portfolio/hero/Hero3D";
import AboutSection from "../components/portfolio/about/AboutSection";
import AlbumProjectsSection from "../components/portfolio/projects/AlbumProjectsSection";
import SkillsSection from "../components/portfolio/skills/SkillsSection";
import CertificationsSection from "../components/portfolio/certifications/CertificationsSection";
import ContactSection from "../components/portfolio/contact/ContactSection";
import ResumeSection from "../components/portfolio/resume/ResumeSection";
import FooterSection from "../components/portfolio/footer/FooterSection";

const Index = () => {
  return (
    <Layout>
      <Hero3D />
      <AboutSection />
      <AlbumProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <ResumeSection />
      <FooterSection />
    </Layout>
  );
};

export default Index;
