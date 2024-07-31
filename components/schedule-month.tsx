"use client";

import {
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfWeek,
} from "date-fns";
import { useDatesStore } from "@/stores/date/date.store";
import { AlarmCheck } from "lucide-react";
import { useDayStore } from "@/stores/day/day.store";

interface ScheduleMonthProps {
  goToDay: (newState: string) => void;
}

export const ScheduleMonth: React.FC<ScheduleMonthProps> = ({ goToDay }) => {
  const getDay = useDayStore((state) => state.getDay());
  const newDay = useDayStore((state) => state.newDay);
  const agenda = useDatesStore((state) => state.getDates());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = getDay.substring(0, 4);
  const month = getDay.substring(5, 7);
  const monthLetter = allMonths[Number(month) - 1];
  const day = getDay.substring(8, 10);

  const handleClick = () => {
    goToDay("Day");
  };

  const actualMonth = `${year}-${month}-${day ? day : "15"}`;
  const newDate = new Date(actualMonth);
  const start = startOfWeek(startOfMonth(newDate), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(newDate), { weekStartsOn: 0 });
  const entireMonth = eachDayOfInterval({ start, end });

  return (
    <div className=" dark:bg-neutral-600 border h-screen pb-12 animate-fade-in">
      <fieldset className="w-[90%] mt-6 mx-auto p-2 duration-200">
        <legend className="text-center text-blue-500 dark:text-neutral-100 text-lg font-bold mt-2 mb-2 px-2">
          {monthLetter} {year}
        </legend>
        <div className="grid grid-cols-7 gap-0 w-full">
          {days.map((day, index) => (
            <div
              key={index}
              className="text-center text-sm border border-gray-400 bg-blue-500 dark:bg-neutral-700 text-white"
            >
              {day}
            </div>
          ))}
          {entireMonth.map((day, index) => {
            const dayFormat = format(day, "dd");
            const monthFormat = format(day, "MM");
            const yearFormat = format(day, "yyyy");
            const dayEntire = `${yearFormat}-${monthFormat}-${dayFormat}`;
            return (
              <div
                key={index}
                className=" text-center border border-gray-400 duration-200 group"
              >
                <div onClick={() => newDay(new Date(`${dayEntire}T00:00:00`))}>
                  <div className="border text-sm font-bold border-t-0 border-l-0 border-r-0 dark:bg-neutral-500 group-hover:bg-blue-300 dark:group-hover:bg-neutral-400 duration-200">
                    {dayFormat}
                  </div>
                  {agenda.some(
                    (agendaItem) =>
                      agendaItem.fecha.startsWith(dayEntire) &&
                      agendaItem.id_agenda !== -1
                  ) ? (
                    <div
                      onClick={handleClick}
                      className="flex justify-center items-center min-h-12 h-14 lg:h-20 dark:bg-neutral-400 overflow-hidden text-ellipsis group-hover:bg-blue-300 dark:group-hover:bg-neutral-100 cursor-pointer duration-200"
                    >
                      <span className="dark:text-blue-700">
                        <AlarmCheck />
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={handleClick}
                      className="flex justify-center items-center min-h-12 h-14 lg:h-20 dark:bg-neutral-500 overflow-hidden text-ellipsis group-hover:bg-blue-300 dark:group-hover:bg-neutral-400 cursor-pointer duration-200"
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
