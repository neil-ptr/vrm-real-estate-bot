import Image, { StaticImageData } from "next/image";
import cardImg1 from "../assets/cardImg1.jpeg";

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
  profileImg: StaticImageData;
  selected: boolean;
}

export function CharacterCard(props: CharacterCardProps) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.image.src})`,
        backgroundSize: "cover",
      }}
      className={`hover:cursor-pointer group backdrop-brightness-50 relative h-[500px] p-4 flex flex-col items-center justify-around w-96 overflow-hidden rounded bg-white shadow-lg shadow-black`}
    >
      <Image alt="profile-img" src={props.profileImg} className="w-3/4 group-hover:w-1/3 transition-all" />
      <h2 className="text-2xl">{props.name}</h2>
      <div className=" p-2 text-center hidden grid-cols-2 details group-hover:grid group-hover:h-96 h-0 w-full transition-all">
        <span>Age: {props.age}</span>
        <span>Job: {props.job}</span>
        <span>Salary: {props.salary}</span>
        <span>Ethnicity: {props.ethnicity}</span>
        <span className="col-span-2">Family: {props.family}</span>
        <span className="col-span-2">Address: {props.currentAddress}</span>
        <span className="col-span-2">Personality: {props.personality}</span>
      </div>
    </div>
  );
}
