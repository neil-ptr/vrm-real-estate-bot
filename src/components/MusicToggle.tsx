"use client";
import useSound from "use-sound";
import { Switch } from "./ui/switch";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const localStorage = window.localStorage;

export function MusicToggle() {
  const [musicEnabled, setMusicEnabled] = useLocalStorage("musicEnabled", true);
  const [play, { stop }] = useSound("/sounds/bg-music.mp4", { volume: 0.5 });

  useEffect(() => {
    if (musicEnabled) {
      play();
    }

    return () => {
      stop();
    };
  }, [play, stop, musicEnabled]);

  return (
    <div className="flex gap-4">
      <Switch
        checked={musicEnabled}
        onCheckedChange={(checked) => {
          if (checked) {
            play();
            localStorage.setItem("musicEnabled", "true");
            setMusicEnabled(true);
          } else {
            stop();
            localStorage.setItem("musicEnabled", "false");
            setMusicEnabled(false);
          }
        }}
      />
      <p>Turn Music {musicEnabled ? "Off" : "On"}</p>
    </div>
  );
}
