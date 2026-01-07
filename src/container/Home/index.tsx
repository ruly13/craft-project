
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { Footer } from "@/components/layout/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomeContainer({ categories }: { categories?: any[] }) {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <Navbar />
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
