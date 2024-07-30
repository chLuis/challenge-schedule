import Image from "next/image";

export const Header = () => {
  return (
    <header className="col-span-12 flex justify-between items-center content-center py-3 px-6 font-medium text-xl select-none h-16 text-black/70">
      <div className="relative col-span-1 flex flex-nowrap gap-2 ">
      <div className="absolute inset-0 rounded-full border-4 border-r-white border-blue-500 w-10 h-10 content-center text-center text-lg animate-spin-long">
        </div>
        <div className="rounded-full  w-10 h-10 content-center text-center text-lg">
          {new Date().getDate()}
        </div>
      </div>
      <Image
        src="/calendar.svg"
        width={400}
        height={250}
        alt="logo"
        priority={true}
        className="col-span-1 max-h-full max-w-96 content-center"
      />
      <div className="col-span-2 flex justify-end">
        <div className="rounded-full bg-blue-500 text-white w-10 h-10 content-center text-center font-mono">
          LC
        </div>
      </div>
    </header>
  );
};
