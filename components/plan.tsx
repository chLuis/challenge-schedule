'use client';

import React from "react";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useDatesStore } from "@/stores/date/date.store";
import { useDayStore } from "@/stores/day/day.store"
import { hours } from "@/constants";
import { Cita } from "@/types/cita";


export const Plan = () => {
  const day = useDayStore((state) => state.day)
  const agenda = useDatesStore((state) => state.dates)
  const changeDate = useDatesStore((state) => state.changeDate)
  //const addDate = useDatesStore((state) => state.addDate)
  //const borrarCita = useDatesStore((state) => state.removeDate)
  const [ agendaToday, setAgendaToday ] = React.useState<Cita[]>([])
  const [ editDate, setEditDate ] = React.useState<Cita | undefined>(undefined)
  

  React.useMemo(() => {
    setAgendaToday(agenda.filter((item) => item.fecha === day))
    //setDayNoFormat(new Date(day))
  }, [agenda, day])

  function handleDate(item: Cita) {
    setEditDate(item)
  }

  function handleNewDate(hour: string) {
    const newItem = {
      id_agenda: null,
      id_paciente: null,
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
      id_agenda: editDate?.id_agenda ?? undefined,
      id_paciente: editDate?.id_paciente ?? 0,
    },
  });
  
  React.useEffect(() => {
    if (editDate) {
      form.reset({
        ape_nom: editDate.ape_nom || "",
        hora: editDate.hora || "",
        fecha: editDate.fecha || "",
        id_agenda: editDate.id_agenda || undefined,
        id_paciente: editDate.id_paciente || 0,
      });
    }
  }, [editDate, form]);


  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    //console.log("BOTON");
    //console.log({ values });
    //console.log(editDate);
    //borrarCita(values)
    changeDate(editDate!, values)
    //addDate(values)
  };

  const handleDelete = (e : any) => {
    e.preventDefault();
    //console.log("DELETE");
    //console.log(editDate);
    //borrarCita(editDate!)
    //setEditDate(undefined)
    const newDate = {
      id_agenda: -1,
      id_paciente: null,
      fecha: day,
      hora: editDate!.hora,
      ape_nom: null,
    }
    //console.log(newDate);
    changeDate(editDate!, newDate)
    }
  return (
    <main className="col-span-12 grid grid-cols-12 mt-20 mx-3 overflow-auto">
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
                  : <div key={index} onClick={() => handleDate(item)} className="h-12 bg-blue-300 w-full z-10 flex items-center px-2 hover:bg-blue-600 text-black/70 hover:text-white duration-150">Patient: {item.ape_nom}</div>
                : null)
              }
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="text-center text-2xl pb-2">{editDate?.id_agenda === -1 || editDate?.id_agenda === null ? "Create meet" : "Edit meet"}</SheetTitle>
            <SheetDescription className="text-start px-4">
              Fill the fields to complete the meet
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
                {editDate?.id_agenda !== -1 && editDate?.id_agenda !== null
                  ? <div className="flex flex-col my-2 gap-2">
                    <SheetClose asChild>
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white">Edit</Button>
                    </SheetClose>
                    
                      <Button onClick={(e) => handleDelete(e)} variant="ghost">Delete</Button>
                    
                    {/* <SheetClose asChild>
                      <Button type="submit" variant="ghost">Delete</Button>
                    </SheetClose> */}
                  </div>
                  : 
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700 my-2 w-full">Create</Button>
                  // <SheetClose asChild>
                  //   <Button type="submit" className="bg-blue-500 hover:bg-blue-700 my-2 w-full">Create</Button>
                  // </SheetClose>
                }
              </form>
            </Form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ))}
  </main>
  )
}

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