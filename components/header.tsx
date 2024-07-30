import Image from "next/image";
import { ModeToggle } from "./mode-toogle";


export const Header = () => {
  return (
    <header className="col-span-12 flex justify-between items-center content-center py-3 px-6 font-medium text-xl select-none h-20 text-black/70 dark:bg-neutral-800">
      <div className="relative col-span-1 flex flex-nowrap gap-2 ">
        <span className="absolute inset-0 rounded-full border-4 border-r-transparent border-blue-500 w-12 h-12 content-center text-center text-lg animate-spin-long hover:animate-spin">
        </span>
        <div className="rounded-full dark:text-white w-12 h-12 content-center text-center text-xl">
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
      <div className="col-span-3 flex gap-2 justify-end dark:bg-neutral-600 p-2 rounded-xl ">
        <div className="rounded-full bg-blue-500 text-white w-10 h-10 content-center text-center font-mono">LC</div>
        <ModeToggle />
      </div>
    </header>
  );
};
