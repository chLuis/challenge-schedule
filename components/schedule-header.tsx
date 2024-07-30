"use client";

import React from "react";
import { PencilLineIcon } from "lucide-react";
import { useDayStore } from "@/stores/day/day.store";
import { nombreDias } from "@/constants";

export const ScheduleHeader = () => {
  const day = useDayStore((state) => state.getDay());
  const [dayNoFormat, setDayNoFormat] = React.useState(new Date(day));

  React.useMemo(() => {
    setDayNoFormat(new Date(day));
  }, [day]);

  return (
    <header className="relative flex gap-4 font-semibold items-center bg-white z-40 col-span-12 mx-6 pb-2 text-center dark:bg-neutral-700">
      <span className=" absolute top-0 left-[0%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[10%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[20%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[30%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[40%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[50%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[60%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[70%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[80%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[90%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <span className=" absolute top-0 left-[100%] w-4 h-4 rounded-full shadow-inner shadow-black/50"></span>
      <div className="mt-8">
        <div className="uppercase text-xs w-10 text-blue-500">
          {nombreDias[dayNoFormat.getDay()].substring(0, 3)}
        </div>
        <div className="text-xl w-10 h-10 bg-blue-500 rounded-full text-white flex justify-center items-center">
          {day.substring(8, 10).startsWith("0")
            ? day.substring(9, 10)
            : day.substring(8, 10)}
        </div>
      </div>
      <h2 className="text-black/80 dark:text-neutral-100 flex items-center justify-center h-full mt-8">
        <PencilLineIcon className="stroke-1 me-2 min-w-6" /><span>Book Your Appointment</span></h2>
    </header>
  );
};
