"use client";

import Link from "next/link";
import { CharacterCard } from "~/components/CharacterCard";
import cardImg2 from "~/assets/cardImg2.jpeg";
import cardImg3 from "~/assets/cardImg3.jpeg";
import characters from "~/constant/characters";
import { useState } from "react";
import { MusicToggle } from "~/components/MusicToggle";
import useSound from "use-sound";

export default function Home() {
  const characterArr = Object.entries(characters).map(([role, character]) => ({ ...character.background, role }));
  const [selected, setSelected] = useState<string>(characterArr?.[1]?.name);

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[#583386] to-[#15162c]">
      <div className="fixed top-8 right-8">
        <MusicToggle />
      </div>
      <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-16 ">
        {characterArr.map((character) => (
          <CharacterCard key={character.name} {...character} selected={character.name === selected} />
        ))}
      </div>
    </main>
  );
}
