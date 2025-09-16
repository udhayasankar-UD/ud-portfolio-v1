import Layout from "../components/Layout";
import Hero3D from "../components/Hero3D";
import AboutSection from "../components/AboutSection";
import AlbumProjectsSection from "../components/AlbumProjectsSection";
import SkillsSection from "../components/SkillsSection";
import CertificationsSection from "../components/CertificationsSection";
import ContactSection from "../components/ContactSection";
import ResumeSection from "../components/ResumeSection";
import FooterSection from "../components/FooterSection";

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
