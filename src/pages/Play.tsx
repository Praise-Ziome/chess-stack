import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ChessBoard from "@/components/ChessBoard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Wifi, Cpu } from "lucide-react";

const categoryTimes = {
  bullet: 1,
  blitz: 5,
  rapid: 10,
  classical: 30,
  untimed: 0,
};

const Play = () => {
  const { category } = useParams<{ category: string }>();
  const [gameMode, setGameMode] = useState<"online" | "computer" | null>(null);

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  const timeInMinutes = category ? categoryTimes[category as keyof typeof categoryTimes] : 0;
  const timeControl = timeInMinutes === 0 ? "Untimed" : `${timeInMinutes} min`;

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground text-lg">Time Control: {timeControl}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              onClick={() => setGameMode("online")}
              className="p-8 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wifi className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Online Game</h2>
                <p className="text-muted-foreground">
                  Play against other players online in real-time
                </p>
              </div>
            </Card>

            <Card
              onClick={() => setGameMode("computer")}
              className="p-8 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Versus Computer</h2>
                <p className="text-muted-foreground">
                  Challenge the AI and improve your skills
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setGameMode(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Change Mode
          </Button>
          <div className="text-center">
            <h2 className="text-xl font-bold">{categoryName} - {timeControl}</h2>
            <p className="text-sm text-muted-foreground">
              {gameMode === "online" ? "Online Game" : "Versus Computer"}
            </p>
          </div>
          <div className="w-24" />
        </div>

        <ChessBoard timeInMinutes={timeInMinutes} />
      </div>
    </div>
  );
};

export default Play;
