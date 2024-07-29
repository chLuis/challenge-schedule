import { Cita } from "@/types/cita";
import { Plan } from "./plan";
import { PlanHeader } from "./plan-header";

export const Schedule = ({dataMeet} : {dataMeet: Cita[]}) => {
  //console.log(meet);
  return (
    <div className="grid grid-cols-12 col-span-12 lg:col-span-8 xl:col-span-9 my-3 px-2 h-full overflow-auto animate-fade-in">
      <PlanHeader />
      <Plan meets={dataMeet}/>
    </div>
  )
}