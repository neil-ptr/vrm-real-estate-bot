"use client";
import useSound from "use-sound";
import { Switch } from "./ui/switch";
import { useState } from "react";

export function MusicToggle() {
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);
  const [play, { stop }] = useSound("/sounds/bg-music.mp3", { volume: 0.5, loop: true });

  return (
    <div className="flex gap-4">
      <Switch
        onCheckedChange={(checked) => {
          if (checked) {
            play();
            setMusicEnabled(true);
          } else {
            stop();
            setMusicEnabled(false);
          }
        }}
      />
      <p>Turn Music {musicEnabled ? "Off" : "On"}</p>
    </div>
  );
}
