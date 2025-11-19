import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";

const Points = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Earn & Manage Points</h2>
          <p className="text-muted-foreground text-lg">
            Your virtual loyalty tokens. Win games, complete challenges, level up.
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-chess-accent flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <h3 className="text-4xl font-bold">2,450</h3>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-500 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">+150 this week</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-background border">
              <p className="text-sm text-muted-foreground mb-1">Games Won</p>
              <p className="text-2xl font-bold">+50 pts</p>
            </div>
            <div className="p-4 rounded-xl bg-background border">
              <p className="text-sm text-muted-foreground mb-1">Daily Login</p>
              <p className="text-2xl font-bold">+10 pts</p>
            </div>
            <div className="p-4 rounded-xl bg-background border">
              <p className="text-sm text-muted-foreground mb-1">Challenges</p>
              <p className="text-2xl font-bold">+100 pts</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1 bg-gradient-to-r from-accent to-chess-accent hover:opacity-90">
              <ArrowUpCircle className="w-5 h-5 mr-2" />
              Deposit Points
            </Button>
            <Button size="lg" variant="outline" className="flex-1 border-2">
              <ArrowDownCircle className="w-5 h-5 mr-2" />
              Withdraw Points
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Points;
