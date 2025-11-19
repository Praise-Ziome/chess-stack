import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Groups from "@/components/Groups";
import Points from "@/components/Points";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Categories />
      <Groups />
      <Points />
      <AIAssistant />
    </div>
  );
};

export default Index;
