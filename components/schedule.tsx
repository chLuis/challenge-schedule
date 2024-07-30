import { ScheduleBody } from "@/components/schedule-body";
import { ScheduleHeader } from "@/components/schedule-header";
import { Cita } from "@/types/cita";

export const Schedule = ({initialData} : {initialData: Cita[]}) => {
  return (
    <div className="grid grid-cols-12 col-span-12 mx-auto w-[90%] lg:w-full border shadow-sm shadow-black/50 py-4 pe-4 lg:col-span-7 xl:col-span-8 my-3 h-full overflow-auto animate-fade-in duration-200 dark:bg-neutral-700">
      <ScheduleHeader />
      <ScheduleBody meets={initialData}/>
    </div>
  )
}