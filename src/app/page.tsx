import Link from "next/link";
import { CharacterCard, testCharacter } from "~/components/CharacterCard";
import cardImg2 from "~/assets/cardImg2.jpeg";
import cardImg3 from "~/assets/cardImg3.jpeg";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[#583386] to-[#15162c]">
      <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-16 ">
        <CharacterCard {...testCharacter} />
        <CharacterCard {...testCharacter} image={cardImg2} />
        <CharacterCard {...testCharacter} image={cardImg3} />
      </div>
    </main>
  );
}
