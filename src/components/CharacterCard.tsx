import Image, { StaticImageData } from "next/image";
import cardImg1 from "../assets/cardImg1.jpeg";

export const testCharacter = {
  name: "James",
  age: 33,
  currentAddress: "San Francisco",
  job: "Designer",
  salary: "$200,000",
  ethnicity: "Korean",
  family: "Married with 2 kids",
  personality: "Outgoing, friendly, and loves to travel",
  image: cardImg1,
};

interface CharacterCardProps {
  name: string;
  age: number;
  currentAddress: string;
  job: string;
  salary: string;
  ethnicity: string;
  family: string;
  personality: string;
  image: StaticImageData;
}

export function CharacterCard(props: CharacterCardProps) {
  return (
    <div className="relative h-[500px] w-96 overflow-hidden rounded bg-white">
      <Image
        className="absolute h-full w-full object-fill"
        alt="card-bg"
        src={props.image}
      />
    </div>
  );
}
