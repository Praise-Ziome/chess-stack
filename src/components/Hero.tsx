import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import heroImage from "@/assets/chess-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Crown className="w-16 h-16 text-accent" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Master Your
          <span className="block bg-gradient-to-r from-accent to-chess-accent bg-clip-text text-transparent">
            Chess Game
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Join players worldwide. Compete in categories, earn points, and train with AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button size="lg" className="bg-gradient-to-r from-accent to-chess-accent hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-[var(--shadow-glow)]">
            Start Playing
          </Button>
          <Button size="lg" variant="outline" className="border-2 px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
