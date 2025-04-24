import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold font-poppins leading-tight mb-4">
            Discover the taste of your neighborhood!
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Authentic local cuisines delivered to your doorstep. Support local restaurants and enjoy the best food in town.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-neutral-100 rounded-full shadow-lg"
              asChild
            >
              <a href="#explore">Explore Now</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full"
              asChild
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-secondary opacity-20 rounded-l-full transform translate-x-1/4"></div>
      <div className="absolute right-0 bottom-0 h-64 w-64 bg-accent opacity-20 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
}
