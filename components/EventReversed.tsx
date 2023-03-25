import Image from "next/image";
import { Event as EventType } from "../models/event";
import { convertTimestampToDateString, getYearFromString } from "../utils";

function parseImageLink(
  imageNumber: number,
  imageUrls: string[] | undefined
): string {
  if (imageUrls == undefined || imageUrls.length <= imageNumber) {
    return "/images/tommy.jpg";
  }

  return imageUrls[imageNumber];
}

export default function EventReversed(props: EventType) {
  return (
    <div className="border border-solid border-slate-200 p-6 m-2 w-full flex justify-evenly items-center flex-col md:flex-row bg-blue-200 rounded-3xl">
      {/* Image Grid section */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-1 p-2 overflow-hidden bg-gradient-to-b from-pink-200 to-orange-200">
        <Image
          src={parseImageLink(0, props.images)}
          alt="tommy"
          width={240}
          height={240}
          className="object-cover object-center col-span-1 row-span-1 md:col-span-2 w-60 h-60"
        />
        <Image
          src={parseImageLink(1, props.images)}
          alt="tommy"
          width={240}
          height={240}
          className="object-cover object-center col-span-1 row-span-1 md:col-span-2 w-60 h-60"
        />
        <Image
          src={parseImageLink(2, props.images)}
          alt="tommy"
          width={240}
          height={240}
          className="object-cover object-center col-span-1 row-span-1 md:col-span-2 w-60 h-60"
        />
        <Image
          src={parseImageLink(3, props.images)}
          alt="tommy"
          width={240}
          height={240}
          className="object-cover object-center col-span-1 row-span-1 md:col-span-2 w-60 h-60"
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
