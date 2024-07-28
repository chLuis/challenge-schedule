// "use client";

// import { useDayStore } from "@/stores/day/day.store";
// import React from "react";

export const Header = () => {
  //const day = useDayStore((state) => state.day);
  // const [dayComplete, setDayComplete] = React.useState(new Date(day));

  // React.useMemo(() => {
  //   setDayComplete(new Date(day));
  // }, [day]);

  return (
    <header className="col-span-12 flex justify-between items-center content-center border-b border-b-black/20 p-3 font-medium text-xl select-none text-black/70">
      <div className="col-span-1 flex flex-nowrap gap-2 ">
        <div className="rounded-full border-4 border-blue-500 w-10 h-10 content-center text-center text-lg">
          {new Date().getDate()}
        </div>
        <div className="col-span-1 content-center">My Calendar</div>
      </div>
      <div className="col-span-8 content-center">
        {/* {dayComplete.toLocaleDateString()} */}
      </div>
      <div className="col-span-2 flex justify-end">
        <div className="rounded-full bg-blue-500 text-white w-10 h-10 content-center text-center">
          L
        </div>
      </div>
    </header>
  );
};