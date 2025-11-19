import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Award } from "lucide-react";

const groups = [
  {
    name: "Blitz Masters",
    members: 248,
    level: "Advanced",
    trend: "+12 today",
  },
  {
    name: "Beginner's Stack",
    members: 512,
    level: "Beginner",
    trend: "+28 today",
  },
  {
    name: "Opening Theory",
    members: 186,
    level: "Intermediate",
    trend: "+8 today",
  },
];

const Groups = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Join Groups & Stacks</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with players at your level, share strategies, and compete together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {groups.map((group) => (
            <Card key={group.name} className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{group.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {group.level}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <TrendingUp className="w-4 h-4" />
                  <span>{group.trend}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Join Group
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Award className="w-5 h-5 mr-2" />
            Create Your Own Stack
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Groups;
