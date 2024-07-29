"use client";

import React from "react";
import { useDayStore } from "@/stores/day/day.store";
import { nombreDias } from "@/constants";

export const PlanHeader = () => {
  const day = useDayStore((state) => state.day);
  const [dayNoFormat, setDayNoFormat] = React.useState(new Date(day));

  React.useMemo(() => {
    setDayNoFormat(new Date(day));
  }, [day]);

  return (
    <header className="sticky flex gap-4 font-semibold items-center bg-white z-40 col-span-12 mx-6 pb-2 text-center">
      <div>
        <div className="uppercase text-xs w-10 text-blue-500">
          {nombreDias[dayNoFormat.getDay()].substring(0, 3)}
        </div>
        <div className="text-xl w-10 h-10 bg-blue-500 rounded-full text-white flex justify-center items-center">
          {day.substring(8, 10).startsWith("0")
            ? day.substring(9, 10)
            : day.substring(8, 10)}
        </div>
      </div>
      <h2>Book Your Appointment Below</h2>
    </header>
  );
};
