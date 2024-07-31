"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useDayStore } from "@/stores/day/day.store";
import Image from "next/image";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

export const CalendarComponent = () => {
  const newDay = useDayStore((state) => state.newDay);
  const getDay = useDayStore((state) => state.getDay());
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2021-09-16T00:00:00")
  );

  React.useMemo(() => {
    newDay(date || new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  React.useEffect(() => {
    setDate(new Date("2021-09-16T00:00:00"));
  }, []);

  const handleSelectDay = (day: Date | undefined) => {
    day ? newDay(day) : newDay(new Date());
  };

  return (
    <div className="col-span-12 w-full dark:bg-neutral-800 lg:col-span-4 xl:col-span-3 flex flex-col gap-4 justify-center items-center md:items-start overflow-auto h-fit min-h-fit py-3 lg:mb-0 duration-200">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full lg:w-72 justify-start text-left font-normal dark:bg-neutral-600",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getDay ? format(getDay, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            className="rounded-md border select-none h-[350px] dark:bg-neutral-600"
            selected={new Date(getDay || "")}
            onSelect={handleSelectDay}
            defaultMonth={new Date(getDay)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Image
        src="/calendarLogo.svg"
        width={400}
        height={400}
        alt="calendar"
        className="object-contain max-w-72 hidden lg:flex opacity-40 dark:opacity-70"
      />
    </div>
  );
};
