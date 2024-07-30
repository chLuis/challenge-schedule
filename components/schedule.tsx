import { ScheduleBody } from "@/components/schedule-body";
import { ScheduleHeader } from "@/components/schedule-header";
import { Cita } from "@/types/cita";

export const Schedule = ({initialData} : {initialData: Cita[]}) => {
  return (
    <div className="grid grid-cols-12 col-span-12 w-full border shadow-sm shadow-black/50 py-4 pe-4 lg:col-span-8 xl:col-span-9 my-3 h-full overflow-auto animate-fade-in duration-200 dark:bg-neutral-600">
      <ScheduleHeader />
      <ScheduleBody meets={initialData}/>
    </div>
  )
}