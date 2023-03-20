import Image from "next/image";
import { Event as EventType } from "../models/event";
import { convertTimestampToDateString } from "../utils";

export default function Event(props: EventType) {
  return (
    <div className="bg-red-200 border border-solid border-slate-200 rounded-md p-6 m-2 w-full flex justify-evenly items-center">
      {/* Description section */}
      <div className="bg-green-200 p-4">
        <h2 className="text-3xl">{props.title}</h2>
        <p className="mb-2">{convertTimestampToDateString(props.date)}</p>
        <p className="leading-relaxed">{props.description}</p>
        <a>{props.images}</a>
      </div>
      {/* Image Grid section */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-1 p-2 bg-green-200">
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
    </div>
  );
}
