import { Card } from "@/components/ui/card";
import { Zap, Target, Clock, Trophy, Infinity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: Zap,
    name: "Bullet",
    time: "1 min",
    description: "Fast-paced games for quick thinkers",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Target,
    name: "Blitz",
    time: "5 min",
    description: "Balanced speed and strategy",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    name: "Rapid",
    time: "10 min",
    description: "More time to plan your moves",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Trophy,
    name: "Classical",
    time: "30 min",
    description: "Deep strategic battles",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Infinity,
    name: "Untimed",
    time: "No time limit",
    description: "Play without time pressure",
    color: "from-amber-500 to-yellow-500",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Game Categories</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Choose your preferred time control and compete
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                onClick={() => navigate(`/play/${category.name.toLowerCase()}`)}
                className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-accent font-semibold mb-3">{category.time}</p>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
