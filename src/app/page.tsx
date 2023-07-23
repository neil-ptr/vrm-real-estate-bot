"use client";

import { CharacterCard } from "~/components/CharacterCard";
import characters from "~/constant/characters";
import { MusicToggle } from "~/components/MusicToggle";

export default function Home() {
  const characterArr = Object.entries(characters).map(([role, character]) => ({ ...character.background, role }));

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[#583386] to-[#15162c]">
      <div className="fixed top-8 right-8">
        <MusicToggle />
      </div>
      <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-16 ">
        {characterArr.map((character) => (
          <CharacterCard key={character.name} {...character} />
        ))}
      </div>
    </main>
  );
}
