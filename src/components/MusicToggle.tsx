"use client";
import useSound from "use-sound";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import { cn } from "~/utils/utils";

export function MusicToggle() {
  const [play, { stop }] = useSound("/sounds/bg-music.mp4", { volume: 0.5 });

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <div className={cn(["flex gap-4"])}>
      <Switch
        onCheckedChange={(checked) => {
          if (checked) {
            play();
          } else {
            stop();
          }
        }}
      />
      <p>Enable Music</p>
    </div>
  );
}
