'use client';

import React from "react";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useDatesStore } from "@/stores/date/date.store";
import { useDayStore } from "@/stores/day/day.store"
import { hours } from "@/constants";
import { Cita } from "@/types/cita";
import { formSchema } from "@/schemas/form";
import { getDate } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import { Calendar } from "@/components/ui/calendar";


import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";



export const ScheduleBody = ({meets} : {meets: Cita[]}) => {
  const day = useDayStore((state) => state.getDay())
  const newDay = useDayStore((state) => state.newDay);
  const agenda = useDatesStore((state) => state.dates)
  const getAgendaSingle = useDatesStore((state) => state.getDate)
  const getAgenda = useDatesStore((state) => state.getDates)
  const addAgenda = useDatesStore((state) => state.addDate)
  const changeAgenda = useDatesStore((state) => state.changeDate)
  const [ editAppointment, setEditAppointment ] = React.useState<Cita | undefined>(undefined)
  const [ dayCalendar, setDayCalendar ] = React.useState<Date | undefined>(new Date(day))
  const newDate = {
    id_agenda: -1,
    id_paciente: null,
    fecha: editAppointment?.fecha ?? "",
    hora: editAppointment?.hora ?? "",
    ape_nom: null,
  }


  React.useMemo(() => {
    newDay(dayCalendar || new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayCalendar]);

  React.useMemo(() => {
    const datos = getAgenda();
    if(datos.length === 0) {
      for (let i = 0; i < meets.length; i++) {
        addAgenda(meets[i])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ape_nom: editAppointment?.ape_nom ?? "",
      hora: editAppointment?.hora ?? "",
      fecha: day,
      id_agenda: editAppointment?.id_agenda ?? 0,
      id_paciente: editAppointment?.id_paciente ?? 0,
    },
  });

  React.useMemo(() => {
    if (editAppointment) {
      form.reset({
        ape_nom: editAppointment.ape_nom || "",
        hora: editAppointment.hora || "",
        fecha: day || "",
        id_agenda: editAppointment.id_agenda || new Date().getTime(),
        id_paciente: editAppointment.id_paciente || Math.floor(Math.random()*10000),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAppointment, day]);

  function handleDate(item: Cita) {
    setEditAppointment(item)
  }

  function handleNewDate(hour: string) {
    const newItem = {
      id_agenda: null,
      id_paciente: null,
      fecha: day,
      hora: hour,
      ape_nom: "",
    }
    setEditAppointment(newItem)
  }

  function completeCreateEditDelete(toastNotification: string) {
    toast(`Appointment ${toastNotification}!`)
    document.getElementById("close-sheet")?.click()
  }

  const handleSubmit = (values: z.infer<typeof formSchema>, secondParam: string) => {
    const dateExist = getAgendaSingle(values)
    if(secondParam === "Updating") {
      if(dateExist) {
        // Si estoy haciendo un update a un campo que esta ocupado por otra cita
        if(dateExist.id_agenda !== -1) {
          if(dateExist.id_agenda === values.id_agenda && dateExist.fecha === values.fecha && dateExist.hora === values.hora ) {
            // Si estoy haciendo un update a un campo que esta ocupado por la misma cita
            changeAgenda(values, values)
            completeCreateEditDelete(secondParam)
            return
          }
          return toast(`The appointment isn't free!`)
        }
        // Si estoy haciendo un update a un cammpo libre, con id = -1
        changeAgenda(dateExist!, values)
        changeAgenda(editAppointment!, newDate)
        completeCreateEditDelete(secondParam)
        return
      } else {
        // Si estoy haciendo un update a un campo totalmente libre
        addAgenda(values)
        changeAgenda(editAppointment!, newDate)
        completeCreateEditDelete(secondParam)
        return
      }
    } else {
      if(!dateExist) {
        // Creando en un campo totalmente libre
        addAgenda(values)
        completeCreateEditDelete(secondParam)
        return
      } else if(dateExist.id_agenda === -1) {
        // Creando en un campo "creado" pero con id = -1
        changeAgenda(values, values)
        completeCreateEditDelete(secondParam)
        return 
      }
      // Intentando crear en un campo ocupado
      toast('Appointment cant be created!')
      return 
    }
  };

  const onSubmitParams = (secondParam: string) => {
    return (values: z.infer<typeof formSchema>) => handleSubmit(values, secondParam);
  }

  const handleDelete = () => {
    changeAgenda(editAppointment!, newDate)
    completeCreateEditDelete("Deleted")
  }


  const handleSelectDay = (day: Date | undefined) => {
    day ? newDay(day) : newDay(new Date());
  };

  return (
    <main className="col-span-12 grid grid-cols-12 mt-2 mx-3 overflow-auto animate-fade-in">
    {hours.map((hour, index) => (
      <Sheet key={index} >
        <SheetTrigger className="col-span-12">
          <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-blue-100 dark:hover:text-neutral-700 dark:hover:bg-blue-200 mx-1 duration-150">
            <div className="w-14 h-12 flex justify-center items-center text-sm border-b border-r border-gray-300">
              {hour}
            </div>
            <div className="w-full border-b h-12 py-0 border-gray-300">
            { agenda.some((item) => item.hora === hour && item.fecha === day)
              ? agenda.map((item, index) =>
                item.hora === hour && item.fecha === day
                  ? item.id_agenda !== -1
                      ? <div key={index} onClick={() => handleDate(item)} className="h-12 text-start text-sm md:text-base bg-blue-200 w-full z-10 flex items-center px-2 hover:bg-blue-600 text-black/70 hover:text-white duration-150 animate-fade-in dark:bg-blue-400 dark:hover:bg-blue-600">Patient: {item.ape_nom}</div>
                      : <div key={index} onClick={() => handleNewDate(hour)} className="h-12 py-0"></div>
                  : null
                )
              : <div key={hour} onClick={() => handleNewDate(hour)} className="w-full h-12 py-0"></div>
            }
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="" >
          <SheetClose id="close-sheet" className="absolute top-0 right-0 m-2"/>
          <SheetHeader>
            <SheetTitle className="text-center text-2xl">{editAppointment?.id_agenda === -1 || editAppointment?.id_agenda === null ? "Create Appointment" : "Edit Appointment"}</SheetTitle>
            <SheetDescription className="text-center px-4">
              Fill the fields to complete the appointment
            </SheetDescription>
            <Form {...form}>
              <form className="flex flex-col gap-4 px-4 pt-4">
                <FormField control={form.control} name="fecha" render={({ field }) => {
                  return (
                    <FormItem className="">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <Input {...field} value={day} className="hidden" disabled/>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !day && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {day ? format(day, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              className="rounded-md border select-none h-[350px] dark:bg-neutral-600"
                              selected={new Date(day)}
                              onSelect={handleSelectDay}
                              defaultMonth={new Date(day)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {/* <Input {...field} value={editAppointment?.fecha} disabled/> */}
                      </FormControl>
                      <FormMessage className="text-xs animate-fade-in" />
                    </FormItem>
                  )
                }}>
                </FormField>
                <FormField control={form.control} name="hora" render={({ field }) => {
                  return (
                    <FormItem >
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map((hora: string, index) => (
                              agenda.some((item) => item.hora === hora && item.fecha === day && item.id_agenda !== -1)
                                ? <SelectItem key={index} value={hora} disabled>{hora}</SelectItem>
                                : <SelectItem key={index} value={hora}>{hora}</SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        {/* <Input {...field} disabled /> */}
                      </FormControl>
                      <FormMessage className="text-xs animate-fade-in" />
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
                      <FormMessage className="text-xs animate-fade-in" />
                    </FormItem>
                  )
                }}>
                </FormField>
                <FormField control={form.control} name="id_agenda" render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>ID Appointment</FormLabel>
                      <FormControl>
                        <Input {...field} type="number"/>
                      </FormControl>
                      <FormMessage className="text-xs animate-fade-in" />
                    </FormItem>
                  )
                }}>
                </FormField>
                <FormField control={form.control} name="id_paciente" render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>ID Patient</FormLabel>
                      <FormControl>
                        <Input {...field} type="number"/>
                      </FormControl>
                      <FormMessage className="text-xs animate-fade-in" />
                    </FormItem>
                  )
                }}>
                </FormField>
                {editAppointment?.id_agenda !== -1 && editAppointment?.id_agenda !== null
                  ? <div className="!flex !flex-col my-2 gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" className="bg-blue-500 hover:bg-blue-700 text-white">Update</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-5/6">
                          <DialogHeader className="gap-4">
                            <DialogTitle className="uppercase">Updating Appointment</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will updating your appointment, confirm?
                            </DialogDescription>
                            <Button type="button" onClick={form.handleSubmit(onSubmitParams("Updating"))} className="bg-blue-500 hover:bg-blue-700 text-white p-0">
                              <DialogClose className="w-full h-full">Confirm</DialogClose>
                            </Button>
                        </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="ghost">Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-5/6">
                          <DialogHeader className="gap-4">
                            <DialogTitle className="uppercase">Deleting Appointment</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your appointment
                            </DialogDescription>
                          <DialogClose onClick={() => handleDelete()} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-red-500 w-full hover:bg-red-700 h-10 px-4 py-2 text-slate-50">
                            Confirm
                          </DialogClose>
                        </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  : <Button type="button" onClick={form.handleSubmit(onSubmitParams("Created"))} className="bg-blue-500 hover:bg-blue-700 my-2 w-full">
                      Create
                    </Button>
                }
              </form>
            </Form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ))}
    <Toaster />
  </main>
  )
}