"use client";

import React from "react";
import { ScheduleBody } from "@/components/schedule-body";
import { ScheduleHeader } from "@/components/schedule-header";
import { ScheduleMonth } from "@/components/schedule-month";
import { Cita } from "@/types/cita";

export const Schedule = ({ initialData }: { initialData: Cita[] }) => {
  const [render, setRender] = React.useState<string>("Day");

  const handleRender = (type: string) => {
    setRender(type);
  };

  return (
    <div className="flex flex-col gap-0 space-y-0 col-span-12 w-full overflow-auto pb-2 lg:col-span-8 xl:col-span-9 my-3 animate-fade-in duration-200 ">
      <div className="flex gap-2 max-h-10 h-10 min-h-10 select-none">
        <div
          className={`dark:bg-neutral-600 ${
            render === "Day"
              ? "bg-blue-400 text-white "
              : "text-black/50 hover:bg-blue-100 dark:text-white dark:bg-neutral-700 dark:border-neutral-800 dark:hover:bg-neutral-600 dark:hover:border-neutral-700"
          } px-4 border flex justify-center items-center font-semibold duration-200 cursor-pointer rounded-t-md`}
          onClick={() => handleRender("Day")}
        >
          Day
        </div>
        <div
          className={`dark:bg-neutral-600 ${
            render === "Month"
              ? "bg-blue-400 text-white "
              : "text-black/50 hover:bg-blue-100 dark:text-white dark:bg-neutral-700 dark:border-neutral-800 dark:hover:bg-neutral-600 dark:hover:border-neutral-700"
          } px-4 border flex justify-center items-center font-semibold duration-200 cursor-pointer rounded-t-md`}
          onClick={() => handleRender("Month")}
        >
          Month
        </div>
      </div>
      {render === "Day" && (
        <div className="grid grid-cols-12 col-span-12 w-full overflow-auto border shadow-sm shadow-black/50 py-4 px-4 lg:col-span-8 xl:col-span-9 my-3 animate-fade-in duration-200 dark:bg-neutral-600">
          <ScheduleHeader />
          <ScheduleBody meets={initialData} />
        </div>
      )}
      {render === "Month" && <ScheduleMonth goToDay={handleRender} />}
    </div>
  );
};