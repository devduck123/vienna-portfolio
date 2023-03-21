import Image from "next/image";
import { Event as EventType } from "../models/event";
import { convertTimestampToDateString, getYearFromString } from "../utils";

export default function EventReversed(props: EventType) {
  return (
    <div className="border border-solid border-slate-200 p-6 m-2 w-full flex justify-evenly items-center flex-col md:flex-row bg-blue-200 rounded-3xl">
      {/* Image Grid section */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-1 p-2 bg-gradient-to-b from-pink-200 to-orange-200">
        <Image
          src="/images/tommy.jpg"
          alt="tommy"
          width="192"
          height="192"
          className="w-full h-full object-cover col-span-1 row-span-1 md:col-span-2"
        />
        <Image
          src="/images/tommy.jpg"
          alt="tommy"
          width="192"
          height="192"
          className="w-full h-full object-cover col-span-1 row-span-1 md:col-span-2"
        />
        <Image
          src="/images/tommy.jpg"
          alt="tommy"
          width="192"
          height="192"
          className="w-full h-full object-cover col-span-1 row-span-1 md:col-span-2"
        />
        <Image
          src="/images/tommy.jpg"
          alt="tommy"
          width="192"
          height="192"
          className="w-full h-full object-cover col-span-1 row-span-1 md:col-span-2"
        />
      </div>
      {/* Description section */}
      <div className="p-4 md:w-7/12">
        <h2 className="text-3xl">{props.title}</h2>
        <p className="mb-2">
          {getYearFromString(convertTimestampToDateString(props.date))}
        </p>
        <p className="leading-relaxed">{props.description}</p>
        {/* <a>{props.images}</a> */}
      </div>
    </div>
  );
}
