import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Point, Direction } from '../types';

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;
const SPEED_INCREMENT = 3;
const MIN_SPEED = 50;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused((p) => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const speed = Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT);
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, isPaused, isGameOver, score]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center gap-4 bg-black p-4 brutal-border">
      <div className="flex justify-between w-full px-2 items-center mb-1 font-pixel text-[10px] uppercase">
        <div className="flex flex-col">
          <span className="text-glitch-magenta">_DATA_HARVESTED</span>
          <motion.span 
            key={score}
            initial={{ color: '#ff00ff', x: -2 }}
            animate={{ color: '#00ffff', x: 0 }}
            className="text-2xl font-pixel-large text-glitch-cyan"
          >
            {score.toString().padStart(3, '0')}
          </motion.span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-zinc-600">_NODE_RECORD</span>
          <span className="text-xl font-pixel text-zinc-400">
            {highScore.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <div className="relative border-4 border-glitch-cyan bg-zinc-950 p-1">
        <div 
          className="grid gap-[2px]"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(85vw, 400px)',
            aspectRatio: '1/1'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.slice(1).some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`w-full h-full aspect-square transition-colors
                  ${isSnakeHead ? 'bg-glitch-cyan' : 
                    isSnakeBody ? 'bg-zinc-800' : 
                    isFood ? 'bg-glitch-magenta animate-pulse' : 'bg-zinc-900/50'}
                `}
              />
            );
          })}
        </div>

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-grayscale"
            >
              <div className="text-center p-8 border-4 border-glitch-magenta bg-black screen-tear">
                {isGameOver ? (
                  <>
                    <h2 className="text-2xl font-pixel-large text-glitch-magenta mb-4 glitch-text" data-text="FATAL_ERROR">FATAL_ERROR</h2>
                    <p className="text-zinc-500 mb-8 font-terminal text-xl">_MEMORY_LEAK_IN_SECTOR_07</p>
                    <button 
                      onClick={resetGame}
                      className="px-8 py-4 bg-glitch-cyan text-black font-pixel text-xs hover:bg-glitch-yellow transition-colors w-full"
                    >
                      REBOOT_CORE
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-pixel-large text-glitch-cyan mb-4 glitch-text" data-text="SYSTEM_HALT">SYSTEM_HALT</h2>
                    <p className="text-zinc-500 mb-8 font-terminal text-xl">_WAITING_FOR_UPLINK</p>
                    <button 
                      onClick={() => setIsPaused(false)}
                      className="px-8 py-4 bg-glitch-magenta text-black font-pixel text-xs hover:bg-glitch-yellow transition-colors w-full"
                    >
                      RESUME_PROCESS
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full font-terminal text-sm text-zinc-600 flex justify-between uppercase mt-2">
        <span>[DIR_INPUT_VECTORS]</span>
        <span>[SPACE_TOGGLE_HALT]</span>
      </div>
    </div>
  );
}
