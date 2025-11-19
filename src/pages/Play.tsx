import ChessBoard from "@/components/ChessBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Play = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Play Chess</h1>
          <p className="text-muted-foreground text-lg">
            Challenge yourself or practice with a friend on the same device
          </p>
        </div>

        <ChessBoard />
      </div>
    </div>
  );
};

export default Play;
