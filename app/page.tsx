import Hero from "@/components/sections/hero";
import Gallery from "@/components/sections/gallery";
import WhyMe from "@/components/sections/why-me";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing";
import BookingSection from "@/components/sections/booking-section";
import Footer from "@/components/sections/footer";
import FloatingActionButton from "@/components/ui/floating-action-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <WhyMe />
      <Testimonials />
      <Pricing />
      <BookingSection />
      <Footer />
      <FloatingActionButton />
    </main>
  );
}

