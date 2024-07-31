import { Cita } from "@/types/cita";
import { CalendarComponent } from "./calendar";
import { Schedule } from "./schedule";

export const BodyCalendar = ({ data }: { data: Cita[] }) => {
  return (
    <div className="col-span-12 w-[90%] overflow-auto grid grid-cols-12 mx-auto">
      <CalendarComponent />
      <Schedule initialData={data} />
    </div>
  );
};
