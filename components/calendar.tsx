"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useDayStore } from "@/stores/day/day.store";
import { useDatesStore } from "@/stores/date/date.store";

export const CalendarComponent = ({citas} : {citas: any}) => {
  const newDay = useDayStore((state) => state.newDay)
  const agenda = useDatesStore((state) => state.dates);
  const addAgenda = useDatesStore((state) => state.addDate);


  React.useMemo(() => {
    if(agenda.length === 0) {
      for (let i = 0; i < citas.length; i++) {
        addAgenda(citas[i])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citas]);

  const [date, setDate] = React.useState<Date | undefined>(new Date("2021-09-16T00:00:00"));
  //console.log(new Date("2024-07-10T00:00:00"));

  React.useMemo(() => {
    newDay(date || new Date())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])
//console.log(date);
  //console.log(agenda);
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex justify-center items-start overflow-auto h-fit min-h-fit p-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};
