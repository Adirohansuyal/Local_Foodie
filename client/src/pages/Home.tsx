import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import CuisineCategories from "@/components/CuisineCategories";
import RestaurantList from "@/components/RestaurantList";
import AppPromo from "@/components/AppPromo";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <CuisineCategories />
        <RestaurantList />
        <AppPromo />
        <Testimonials />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
