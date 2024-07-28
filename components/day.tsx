'use client';

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
import { useDatesStore } from "@/stores/date/date.store";
import { useDayStore } from "@/stores/day/day.store"
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const Day = () => {
  const day = useDayStore((state) => state.day)
  const agenda = useDatesStore((state) => state.dates)
  const borrarCita = useDatesStore((state) => state.removeDate)
  const [ agendaToday, setAgendaToday ] = React.useState<Cita[]>([])
  const [ editDate, setEditDate ] = React.useState<Cita | undefined>(undefined)
  const [ dayNoFormat, setDayNoFormat ] = React.useState(new Date(day))
  //console.log(agenda);
  const nombreDias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  React.useMemo(() => {
    setAgendaToday(agenda.filter((item) => item.fecha === day))
    setDayNoFormat(new Date(day))
  }, [agenda, day])

  function handleDate(item: Cita) {
    setEditDate(item)
  }

  function handleNewDate(hour: string) {
    const newItem = {
      id_agenda: -1,
      id_paciente: -1,
      fecha: day,
      hora: hour,
      ape_nom: "",
    }
    setEditDate(newItem)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ape_nom: editDate?.ape_nom ?? "",
      hora: editDate?.hora ?? "",
      fecha: editDate?.fecha ?? "",
      id_agenda: editDate?.id_agenda ?? -1,
      id_paciente: editDate?.id_paciente ?? -1,
    },
  });
  
  React.useEffect(() => {
    if (editDate) {
      form.reset({
        ape_nom: editDate.ape_nom || "",
        hora: editDate.hora || "",
        fecha: editDate.fecha || "",
        id_agenda: editDate.id_agenda || -1,
        id_paciente: editDate.id_paciente || -1,
      });
    }
  }, [editDate, form]);

  //console.log(editDate);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("BOTON");
    console.log({ values });
    borrarCita(editDate!)
  };

  return (
    <div className="grid grid-cols-12 col-span-12 lg:col-span-8 xl:col-span-9 my-3 px-2 h-full overflow-auto animate-fade-in">
      <div className="fixed bg-white z-40 col-span-12 mx-6 w-full pb-2 text-center">
        <div className="uppercase text-xs font-semibold w-10 text-blue-500">{nombreDias[dayNoFormat.getDay()].substring(0, 3)}</div>
        <div className="text-xl w-10 h-10 bg-blue-500 rounded-full text-white font-semibold flex justify-center items-center">{(day.substring(8, 10)).startsWith("0") ? day.substring(9, 10) : day.substring(8, 10)}</div>
      </div>
      <div className="col-span-12 grid grid-cols-12 mt-20 mx-3 overflow-auto">
        {hours.map((hour, index) => (
          <Sheet key={index}>
            <SheetTrigger className="col-span-12 ">
              <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-blue-100 mx-1 duration-150">
                <div className="w-14 h-12 flex justify-center items-center text-sm border-b border-r border-gray-300">
                  {hour}
                </div>
                <div className="w-full border-b h-12 py-0 border-gray-300">
                  {agendaToday.length === 0
                    ? <div onClick={() => handleNewDate(hour)} className="w-full h-12 py-0"></div>
                    : null
                  }
                  {agendaToday.map((item: Cita, index) => item.hora === hour
                    ? item.id_agenda === -1
                      ? <div key={index} onClick={() => handleDate(item)} className="w-full h-12 py-0 "></div>
                      : <div key={index} onClick={() => handleDate(item)} className="h-12 bg-blue-300 w-full z-10 flex items-center px-2 hover:bg-blue-600 text-black/70 hover:text-white duration-150">{item.ape_nom}</div>
                    : null)
                  }
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="text-center text-2xl pb-2">{editDate?.id_agenda === -1 ? "Create meet" : "Edit meet"}</SheetTitle>
                <SheetDescription className="text-start px-4">
                  Turno
                </SheetDescription>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
                    <FormField control={form.control} name="fecha" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input {...field} value={editDate?.fecha} disabled/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}>
                    </FormField>
                    <FormField control={form.control} name="hora" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}>
                    </FormField>
                    <FormField control={form.control} name="ape_nom" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Fullname</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}>
                    </FormField>
                    <FormField control={form.control} name="id_agenda" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>ID Meet</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}>
                    </FormField>
                    <FormField control={form.control} name="id_paciente" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>ID Patient</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}>
                    </FormField>
                    {editDate?.id_agenda !== -1
                      ? <div className="flex flex-col my-2 gap-2">
                        <SheetClose asChild>
                          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white">Edit</Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button type="submit" variant="ghost">Delete</Button>
                        </SheetClose>
                      </div>
                      : <SheetClose asChild>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 my-2 w-full">Create</Button>
                      </SheetClose>
                    }
                  </form>
                </Form>
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
const formSchema = z.object({
  ape_nom: z.string().min(4, {
    message: "Fullname must be at least 4 characters.",
  }),
  id_paciente: z.coerce.number().min(1, {
    message: "ID patient must be at least 1 digit.",
  }).positive({message:"ID number must be positive"}),
  fecha: z.string().min(10, {
    message: "Date must be at least 10 characters.",
  }),
  hora: z.string().min(4, {
    message: "Timme must be at least 4 characters.",
  }),
  id_agenda: z.coerce.number().min(1, {
    message: "ID Agenda must be at least 1 numbers.",
  }),
})


// export function ProfileForm() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     // defaultValues: {
//     //   ape_nom: "",
//     // },
//   })
// }


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