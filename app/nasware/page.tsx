import Hero from "@/components/sections/hero";
import Autopsy from "@/components/sections/autopsy";
import Pricing from "@/components/sections/pricing";
import Founder from "@/components/sections/founder";
import BookingSection from "@/components/sections/booking-section";
import Footer from "@/components/sections/footer";
import FloatingActionButton from "@/components/ui/floating-action-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Autopsy />
      <Pricing />
      <Founder />
      <BookingSection />
      <Footer />
      <FloatingActionButton />
    </main>
  );
}
