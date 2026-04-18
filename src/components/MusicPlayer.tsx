import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'NEON_PULSE_v1',
    artist: 'KERNEL_SYNTH',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/glitch1/200/200?grayscale',
  },
  {
    id: '2',
    title: 'DIGITAL_RAIN_v2',
    artist: 'CYBER_LOFI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/glitch2/200/200?grayscale',
  },
  {
    id: '3',
    title: 'VOID_RUNNER_v3',
    artist: 'DEEP_TECHNO',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/glitch3/200/200?grayscale',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="w-full max-w-sm bg-black brutal-border-magenta p-4 flex flex-col gap-4 relative overflow-hidden">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <div className="flex gap-4">
        <div className="relative w-24 h-24 border-2 border-glitch-magenta flex-shrink-0 grayscale contrast-125">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-glitch-cyan/10 animate-pulse pointer-events-none" />
        </div>

        <div className="flex flex-col justify-center min-w-0 font-pixel">
          <h3 className="text-sm truncate text-glitch-cyan glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-[10px] text-zinc-500 tracking-tighter uppercase mt-1">
            ORIGIN: {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="relative h-4 w-full bg-zinc-900 border border-zinc-800">
          <div 
            className="absolute top-0 left-0 h-full bg-glitch-magenta shadow-[2px_0_0_#00ffff]"
            style={{ width: `${(progress / (duration || 1)) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-terminal text-[10px] text-white mix-blend-difference">
            SIGNAL_STRENGTH: {Math.round((progress / (duration || 1)) * 100)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={prevTrack}
          className="border-2 border-glitch-cyan bg-black text-glitch-cyan p-2 font-pixel text-[10px] hover:bg-glitch-cyan hover:text-black transition-colors"
        >
          PREV_SEG
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="border-2 border-glitch-magenta bg-black text-glitch-magenta p-2 font-pixel text-[10px] hover:bg-glitch-magenta hover:text-black transition-colors"
        >
          {isPlaying ? 'PAUSE_CORE' : 'ENGAGE_CORE'}
        </button>
        <button 
          onClick={nextTrack}
          className="border-2 border-glitch-cyan bg-black text-glitch-cyan p-2 font-pixel text-[10px] hover:bg-glitch-cyan hover:text-black transition-colors"
        >
          NEXT_SEG
        </button>
      </div>

      <div className="font-terminal text-[10px] text-zinc-700 uppercase flex justify-between">
        <span>[FREQ_MOD: ON]</span>
        <span>[UPLINK: SECURE]</span>
      </div>

      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-white font-pixel-large">
        AUDIO_VOID
      </div>
    </div>
  );
}
