import Layout from "../components/Layout";
import HeroSplit from "../components/HeroSplit";
import AboutSection from "../components/AboutSection";
import AlbumProjectsSection from "../components/AlbumProjectsSection";
import ContactSection from "../components/ContactSection";
import ResumeSection from "../components/ResumeSection";
import FooterSection from "../components/FooterSection";

const Index = () => {
  return (
    <Layout>
      <HeroSplit />
      <AboutSection />
      <AlbumProjectsSection />
      <ContactSection />
      <ResumeSection />
      <FooterSection />
    </Layout>
  );
};

export default Index;
