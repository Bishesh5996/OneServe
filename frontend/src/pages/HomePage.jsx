import { CallToActionSection } from "@components/sections/CallToActionSection.jsx";
import { FeaturedKitsSection } from "@components/sections/FeaturedKitsSection.jsx";
import { HeroSection } from "@components/sections/HeroSection.jsx";
import { HowItWorksSection } from "@components/sections/HowItWorksSection.jsx";
import { TestimonialsSection } from "@components/sections/TestimonialsSection.jsx";
import { ValuePropsSection } from "@components/sections/ValuePropsSection.jsx";

export const HomePage = () => (
  <div className="space-y-12 py-12">
    <HeroSection />
    <ValuePropsSection />
    <FeaturedKitsSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <CallToActionSection />
  </div>
);
