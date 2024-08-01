'use client';

import Image from "next/image";
import { ModeToggle } from "./mode-toogle";
import { useDayStore } from "@/stores/day/day.store";

export const Header = () => {
  const newDay = useDayStore((state) => state.newDay);
  return (
    <header className="col-span-12 flex w-[90%] mx-auto justify-between items-center content-center py-3 font-medium text-xl select-none h-20 text-black/70 dark:bg-neutral-800">
      <div onClick={() => newDay(new Date(new Date().toISOString().substring(0,10)+"T00:00:00"))} className="relative col-span-1 flex flex-nowrap gap-2 cursor-pointer">
        <span className="absolute inset-0 rounded-full border-4 border-r-transparent border-blue-500 w-12 h-12 content-center text-center text-lg animate-spin-long hover:animate-spin">
        </span>
        <div className="rounded-full dark:text-white w-12 h-12 content-center text-center text-xl">
          {new Date().getDate()}
        </div>
        <div className="w-12 h-12 dark:text-neutral-100 flex justify-center items-center">Today</div>
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
