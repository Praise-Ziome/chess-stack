import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const makeMove = (sourceSquare: string, targetSquare: string) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Always promote to queen for simplicity
      });

      if (move === null) return false;

      setGame(gameCopy);
      setGameHistory([...gameHistory, move.san]);

      // Check game status
      if (gameCopy.isCheckmate()) {
        toast({
          title: "Checkmate!",
          description: `${gameCopy.turn() === "w" ? "Black" : "White"} wins!`,
        });
      } else if (gameCopy.isDraw()) {
        toast({
          title: "Draw!",
          description: "The game ended in a draw.",
        });
      } else if (gameCopy.isCheck()) {
        toast({
          title: "Check!",
          description: `${gameCopy.turn() === "w" ? "White" : "Black"} is in check.`,
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const onDrop = ({ sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    return makeMove(sourceSquare, targetSquare);
  };

  const resetGame = () => {
    setGame(new Chess());
    setGameHistory([]);
    toast({
      title: "New Game",
      description: "The board has been reset.",
    });
  };

  const resign = () => {
    toast({
      title: "Game Over",
      description: `${game.turn() === "w" ? "White" : "Black"} resigned. ${
        game.turn() === "w" ? "Black" : "White"
      } wins!`,
    });
    setGame(new Chess()); // Reset after resignation
    setGameHistory([]);
  };

  const getTurnColor = () => (game.turn() === "w" ? "White" : "Black");
  const isGameOver = game.isGameOver();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chess Board */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold">Live Game</h3>
              <Badge variant={isGameOver ? "destructive" : "default"}>
                {isGameOver ? "Game Over" : `${getTurnColor()}'s Turn`}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetGame} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
              <Button
                onClick={resign}
                variant="destructive"
                size="sm"
                disabled={isGameOver}
              >
                <Flag className="w-4 h-4 mr-2" />
                Resign
              </Button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
            <Chessboard
              options={{
                position: game.fen(),
                onPieceDrop: onDrop,
              }}
            />
          </div>

          {/* Game Status */}
          <div className="mt-6 p-4 rounded-lg bg-muted">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-semibold">
                  {game.isCheckmate()
                    ? "Checkmate"
                    : game.isDraw()
                    ? "Draw"
                    : game.isCheck()
                    ? "Check"
                    : "Active"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Moves:</span>
                <span className="ml-2 font-semibold">{gameHistory.length}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Move History */}
      <div className="lg:col-span-1">
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold mb-4">Move History</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {gameHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm">No moves yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {gameHistory.map((move, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-sm ${
                      index % 2 === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <span className="font-mono font-semibold">
                      {Math.floor(index / 2) + 1}. {move}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FEN Display */}
          <div className="mt-6 p-3 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground mb-1">Current FEN:</p>
            <code className="text-xs break-all">{game.fen()}</code>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChessBoard;
