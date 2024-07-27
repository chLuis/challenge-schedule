'use client';

import { useDatesStore } from "@/stores/date/date.store";
import { useDayStore } from "@/stores/day/day.store"
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Cita } from "@/types/cita";


export const Day = () => {
  const day = useDayStore((state) => state.day)
  const agenda = useDatesStore((state) => state.dates)
  const borrarCita = useDatesStore((state) => state.removeDate)
  const [agendaToday, setAgendaToday] = React.useState<Cita[]>([])
  const [ editDate, setEditDate ] = React.useState<Cita>()
  const [ dayNoFormat, setDayNoFormat ] = React.useState(new Date(day))
  
  const nombreDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  React.useMemo(() => {
    setAgendaToday(agenda.filter((item) => item.fecha === day))
    setDayNoFormat(new Date(day))
  }, [agenda, day])

  
  function handleDate(item:Cita) {
    setEditDate(item) 
  }


  function handleNewDate(hour: string) {
    //setShowForm(true)
    const newItem = {
      id_agenda: -1,
      id_paciente: 50,
      fecha: day,
      hora: hour,
      ape_nom: "",
      }
    setEditDate(newItem) 
  }


  return (
    <div className="grid grid-cols-12 col-span-12 lg:col-span-8 xl:col-span-9 my-3 px-2 h-full overflow-auto">
      <div className="fixed bg-white z-40 col-span-12 w-full pb-2 text-center">
        <div className="uppercase text-sm w-14">{nombreDias[dayNoFormat.getDay()].substring(0,3)}</div>
        <div className="text-2xl w-14">{(day.substring(8,10)).startsWith("0") ? day.substring(9,10):day.substring(8,10)}</div>
      </div>
      <div className="col-span-12 grid grid-cols-12 mt-14 overflow-auto">

      {hours.map((hour, index) => (
        <Sheet key={index} >
          <SheetTrigger className="grid grid-cols-12 col-span-12">
            <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-slate-200 mx-1">
              <div className="w-14 h-12 flex justify-center items-center text-sm ">
                {hour}
              </div>
              <div className="w-full border-b h-12 py-0 border-gray-300">
                {agendaToday.length === 0
                  ? <div onClick={() => handleNewDate(hour)} className="w-full h-12 py-0"></div>
                  : null
                }
                {agendaToday.map((item:Cita, index) => item.hora === hour
                  ? item.id_agenda === -1 
                    ? <div key={index} onClick={() => handleDate(item)} className="w-full  h-12 py-0 "></div> 
                    : <div key={index} onClick={() => handleDate(item)} className="h-11 bg-violet-300 w-full z-10 flex items-center px-2 hover:bg-violet-700 hover:text-white">{item.ape_nom}</div>
                  : null)
                  }
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Editando una cita</SheetTitle>
              <SheetDescription>
                Realice los cambios
              </SheetDescription>
                <div>
                  <div className="bg-white p-4">
                    <div>{editDate?.ape_nom ? editDate?.ape_nom : "No hay paciente"}</div>
                    <div>Fecha: {editDate?.fecha.substring(0,10) || day.substring(0,10)}</div>
                    <div>Hora: {editDate?.hora}</div>
                    <div>id paciente {editDate?.id_paciente ? editDate?.id_paciente : "no hay"}</div>
                    {editDate?.id_agenda !== -1 
                      ? <>
                        <SheetClose asChild>
                          <Button onClick={() => editDate && borrarCita(editDate)} variant="secondary" >Editar cita</Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button onClick={() => editDate && borrarCita(editDate)}>Cancelar cita</Button>
                        </SheetClose>
                        </>
                      : <SheetClose asChild>
                          <Button onClick={() => borrarCita(editDate)} className="bg-blue-400">Crear cita</Button>
                        </SheetClose>
                    }
                  </div>
                </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        
      ))}
      </div>
      
    </div>
  )
}
const hours = [
"10:00",
"10:30",
"11:00",
"11:30",
"12:00",
"12:30",
"13:00",
"13:30",
"14:00",
"14:30",
"15:00",
"15:30",
"16:00",
"16:30",
"17:00",
"17:30",
"18:00"
]


// <div key={index} className="grid grid-cols-12 col-span-12">
        //   <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-slate-200 mx-1">
        //     <div className="w-14 h-12 flex justify-center items-center text-sm ">
        //       {hour}
        //     </div>
        //     <div className="w-full border-b h-12 py-0 border-gray-300">
        //       {agendaToday.length === 0
        //         ? <div onClick={() => handleNewDate(hour)} className="w-full border-b h-12 py-0 border-gray-100"></div>
        //         : null}
        //       {agendaToday.map((item:Date, index) => item.hora === hour
        //         ? item.id_agenda === -1 
        //           ? <div key={index} onClick={() => handleDate(item)} className="w-full border-b h-12 py-0 border-gray-100"></div> 
        //           : <div key={index} onClick={() => handleDate(item)} className="h-11 bg-violet-300 w-full z-10 flex items-center px-2 hover:bg-violet-700 hover:text-white">{item.ape_nom}</div>
        //         : null
        //       )
        //       }
        //     </div>
        //   </div>


        // </div>

        {/* {showForm && <div onClick={() => setShowForm(false)} className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="bg-white p-4">
          <div>Editando una cita</div>
          <div>{editDate?.ape_nom ? editDate?.ape_nom : "No hay paciente"}</div>
          <div>Fecha: {editDate?.fecha.substring(0,10) || day.substring(0,10)}</div>
          <div>Hora: {editDate?.hora}</div>
          <div>id paciente {editDate?.id_paciente ? editDate?.id_paciente : "no hay"}</div>
        </div>
      </div>} */}
