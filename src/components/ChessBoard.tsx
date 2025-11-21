import { useState, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PIECE_SYMBOLS: Record<string, string> = {
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
};

interface ChessBoardProps {
  timeInMinutes: number;
}

const ChessBoard = ({ timeInMinutes }: ChessBoardProps) => {
  const [game, setGame] = useState(new Chess());
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [whiteTime, setWhiteTime] = useState(timeInMinutes * 60);
  const [blackTime, setBlackTime] = useState(timeInMinutes * 60);
  const { toast } = useToast();

  useEffect(() => {
    if (!gameStarted || timeInMinutes === 0 || game.isGameOver()) return;

    const interval = setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 0) {
            toast({
              title: "Time's up!",
              description: "Black wins on time!",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 0) {
            toast({
              title: "Time's up!",
              description: "White wins on time!",
              variant: "destructive",
            });
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, game, timeInMinutes, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const makeMove = (from: Square, to: Square) => {
    if (!gameStarted && timeInMinutes > 0) {
      setGameStarted(true);
    }

    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from,
        to,
        promotion: "q",
      });

      if (move === null) return false;

      setGame(gameCopy);
      setGameHistory([...gameHistory, move.san]);
      setSelectedSquare(null);
      setPossibleMoves([]);

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

  const handleSquareClick = (square: Square) => {
    if (timeInMinutes > 0 && !gameStarted) return;

    if (selectedSquare) {
      if (possibleMoves.includes(square)) {
        makeMove(selectedSquare, square);
      } else {
        const piece = game.get(square);
        if (piece && piece.color === game.turn()) {
          setSelectedSquare(square);
          const moves = game.moves({ square, verbose: true });
          setPossibleMoves(moves.map(m => m.to as Square));
        } else {
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setPossibleMoves(moves.map(m => m.to as Square));
      }
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setGameHistory([]);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameStarted(false);
    setWhiteTime(timeInMinutes * 60);
    setBlackTime(timeInMinutes * 60);
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
    setGame(new Chess());
    setGameHistory([]);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameStarted(false);
    setWhiteTime(timeInMinutes * 60);
    setBlackTime(timeInMinutes * 60);
  };

  const getTurnColor = () => (game.turn() === "w" ? "White" : "Black");
  const isGameOver = game.isGameOver() || (timeInMinutes > 0 && (whiteTime <= 0 || blackTime <= 0));

  const renderBoard = () => {
    const squares: JSX.Element[] = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    ranks.forEach((rank, rankIndex) => {
      files.forEach((file, fileIndex) => {
        const square = (file + rank) as Square;
        const piece = game.get(square);
        const isLight = (rankIndex + fileIndex) % 2 === 0;
        const isSelected = square === selectedSquare;
        const isPossibleMove = possibleMoves.includes(square);

        squares.push(
          <div
            key={square}
            onClick={() => handleSquareClick(square)}
            className={`
              aspect-square flex items-center justify-center cursor-pointer text-3xl sm:text-4xl md:text-5xl
              transition-all duration-200 hover:opacity-80 relative
              ${isLight ? 'bg-[hsl(var(--board-light))]' : 'bg-[hsl(var(--board-dark))]'}
              ${isSelected ? 'ring-4 ring-primary ring-inset' : ''}
            `}
          >
            {piece && (
              <span className={piece.color === 'w' ? 'text-foreground' : 'text-muted'}>
                {PIECE_SYMBOLS[piece.type === piece.type.toUpperCase() ? piece.type : piece.type.toUpperCase()]}
              </span>
            )}
            {isPossibleMove && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full ${piece ? 'ring-4 ring-primary' : 'bg-primary/40'}`} />
              </div>
            )}
          </div>
        );
      });
    });

    return squares;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {timeInMinutes > 0 && (
          <Card className="p-4 mb-4">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-sm text-muted-foreground mb-1">White</div>
                <div className={`text-3xl font-bold ${game.turn() === 'w' && gameStarted ? 'text-accent' : ''}`}>
                  {formatTime(whiteTime)}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="text-sm text-muted-foreground mb-1">Black</div>
                <div className={`text-3xl font-bold ${game.turn() === 'b' && gameStarted ? 'text-accent' : ''}`}>
                  {formatTime(blackTime)}
                </div>
              </div>
            </div>
            {!gameStarted && (
              <div className="mt-4 text-center">
                <Button onClick={() => setGameStarted(true)} className="w-full">
                  Start Game
                </Button>
              </div>
            )}
          </Card>
        )}
        
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

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-8 gap-0 border-4 border-border rounded-lg overflow-hidden shadow-[var(--shadow-card)]">
              {renderBoard()}
            </div>
          </div>

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
