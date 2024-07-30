"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useDayStore } from "@/stores/day/day.store";
import Image from "next/image";

export const CalendarComponent = () => {
  const newDay = useDayStore((state) => state.newDay)
  const [date, setDate] = React.useState<Date | undefined>(new Date("2021-09-16T00:00:00"));

  React.useMemo(() => {
    newDay(date || new Date())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  React.useEffect(() => {
    setDate(new Date("2021-09-16T00:00:00"))
  },[])

  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4 justify-center items-center overflow-auto h-fit min-h-fit p-3 lg:mb-0 duration-200">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border select-none h-[350px] lg:mb-12"
        defaultMonth={date}
      />
      <Image src="/calendarLogo.svg" width={400} height={400} alt="calendar" className="object-contain max-w-64 hidden lg:flex opacity-40"/>
    </div>
  );
};
