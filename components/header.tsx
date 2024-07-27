'use client';

import { useDayStore } from "@/stores/day/day.store"
import React from "react";

export const Header = () => {
  const day = useDayStore((state) => state.day)
  const [dayComplete, setDayComplete] = React.useState(new Date(day))

  React.useMemo(() => { 
    setDayComplete(new Date(day))
  }, [day])

  return (
    <header className="col-span-12 grid grid-cols-12 content-center border-b border-b-black p-3">
    <div className="col-span-3 flex flex-nowrap gap-2 ">
      <div className="rounded-full border-2 border-blue-700 w-10 h-10 content-center text-center">26</div>
      <div className="content-center">Hoy</div>
    </div>
    <div className="col-span-3 content-center">My Calendar</div>
    {/* <div className="col-span-1 content-center">{"<"}</div>
    <div className="col-span-1 content-center">{">"}</div> */}
    <div className="col-span-4 content-center text-center">{dayComplete.toLocaleDateString()}</div>
    <div className="col-span-2 flex justify-end">
      <div className="rounded-full bg-blue-400 text-white w-10 h-10 content-center text-center">L</div>
    </div>
  </header>
  )
}