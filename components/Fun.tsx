import Image from "next/image";

export default function Fun() {
  return (
    <section className="flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-bold mb-4">Fun</h1>
      {/* Image Grid section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="max-w-xs">
          <Image
            src="/images/duck/1.jpeg"
            alt="tommy"
            width={288}
            height={288}
            className="object-cover object-center rounded-xl shadow-lg shadow-slate-400"
          />
        </div>
        <div className="max-w-xs">
          <Image
            src="/images/duck/2.jpeg"
            alt="tommy"
            width={288}
            height={288}
            className="object-cover object-center rounded-xl shadow-lg shadow-slate-400"
          />
        </div>
      </div>
      {/* Description section */}
      <div className="w-full md:max-w-3xl p-2 m-2 leading-relaxed text-lg">
        <p className="m-2.5">
          Over the past 8+ years, I've worked in various areas of industries
          including facilities and hospitality management to deliver quality
          experiences through project management, graphic design. I generally
          enjoy wearing many hats! :)
        </p>
        <p className="m-2.5">
          In my free time, I spend my days reading to my dog, Duck. She is a 3
          year old German shepherd husky dog. My dream is to travel to Japan
          because I love hello kitty and mochi.
        </p>
      </div>
    </section>
  );
}
