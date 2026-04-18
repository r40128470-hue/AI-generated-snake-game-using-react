import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Database, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-void text-white flex flex-col items-center p-4 relative overflow-hidden font-mono select-none">
      {/* CRT Overlay */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Background Distortions */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-glitch-cyan animate-[glitch-noise_2s_infinite]" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-glitch-magenta animate-[glitch-noise_3.5s_infinite]" />
      </div>

      <header className="z-10 mt-8 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative inline-block"
        >
          <h1 
            className="text-5xl md:text-8xl font-pixel-large tracking-tighter uppercase glitch-text" 
            data-text="VOID_LOGIC"
          >
            VOID_LOGIC
          </h1>
          <div className="absolute -bottom-6 left-0 w-full h-1 bg-glitch-cyan shadow-[0_4px_0_#ff00ff]" />
        </motion.div>
        
        <div className="mt-12 flex justify-center gap-12 font-terminal text-xl text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-2 animate-pulse">
            <Activity size={18} /> OS_v7.2.1
          </span>
          <span className="flex items-center gap-2">
            <Terminal size={18} /> ROOT_ACCESS
          </span>
          <span className="flex items-center gap-2">
            <Database size={18} /> BUFFER_STABLE
          </span>
        </div>
      </header>

      <main className="z-10 grid grid-cols-1 lg:grid-cols-[400px_minmax(0,1fr)] gap-8 w-full max-w-6xl items-start pb-20">
        {/* Right side move to left for better grid balance in brutalist style */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <MusicPlayer />
          
          <div className="bg-black p-4 brutal-border flex flex-col gap-4 font-terminal text-lg">
            <h3 className="text-glitch-yellow uppercase border-b border-zinc-800 pb-2 flex items-center justify-between">
              SYSLOG_MONITOR <span className="w-2 h-2 bg-glitch-cyan animate-ping rounded-full" />
            </h3>
            <div className="space-y-1 text-zinc-400">
              <p className="text-glitch-cyan">&gt; INITIALIZING_NEURAL_UPLINK...</p>
              <p>&gt; MAPPING_GRID_VECTORS...</p>
              <p>&gt; AUDIO_SIGNAL_CAPTURED::V2</p>
              <p className="text-glitch-magenta animate-pulse">&gt; WARNING: MEMORY_FRAGMENTATION_DETECTED</p>
              <p>&gt; SNAKE_THREAD_ACTIVE</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-glitch-cyan text-black p-2 font-pixel text-[10px] text-center uppercase font-bold cursor-help hover:invert transition-all">
              DOWNLOAD_DATA
            </div>
            <div className="bg-glitch-magenta text-black p-2 font-pixel text-[10px] text-center uppercase font-bold cursor-help hover:invert transition-all">
              PURGE_MEMORY
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center order-1 lg:order-2">
          <div className="relative">
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-glitch-yellow" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-glitch-yellow" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-glitch-yellow" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-glitch-yellow" />
            
            <SnakeGame />
          </div>
        </div>
      </main>

      <footer className="z-10 fixed bottom-0 left-0 w-full p-2 bg-black border-t-2 border-glitch-cyan flex justify-between font-terminal text-sm text-zinc-600 uppercase">
        <div className="flex gap-4">
          <span className="text-glitch-cyan bg-zinc-900 px-2 font-bold animate-pulse">REC_ACTIVE</span>
          <span>LATENCY: 0.041ms</span>
        </div>
        <div>
          ENCRYPTION: AES-256-GCM | SECTOR: A-99
        </div>
      </footer>
    </div>
  );
}
