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

export const ScheduleBody = ({meets} : {meets: Cita[]}) => {
  const day = useDayStore((state) => state.getDay())
  const agenda = useDatesStore((state) => state.dates)
  const getAgenda = useDatesStore((state) => state.getDates)
  const changeAgenda = useDatesStore((state) => state.changeDate)
  const [ editAppointment, setEditAppointment ] = React.useState<Cita | undefined>(undefined)

  React.useMemo(() => {
    const datos = getAgenda();
    if(datos.length === 0) {
      for (let i = 0; i < meets.length; i++) {
        changeAgenda(meets[i], meets[i])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ape_nom: editAppointment?.ape_nom ?? "",
      hora: editAppointment?.hora ?? "",
      fecha: editAppointment?.fecha ?? "",
      id_agenda: editAppointment?.id_agenda ?? 0,
      id_paciente: editAppointment?.id_paciente ?? 0,
    },
  });

  React.useMemo(() => {
    if (editAppointment) {
      form.reset({
        ape_nom: editAppointment.ape_nom || "",
        hora: editAppointment.hora || "",
        fecha: editAppointment.fecha || "",
        id_agenda: editAppointment.id_agenda || new Date().getTime(),
        id_paciente: editAppointment.id_paciente || 0,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAppointment]);

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

  const handleSubmit = (values: z.infer<typeof formSchema>, secondParam: string) => {
    changeAgenda(editAppointment!, values)
    document.getElementById("close-sheet")?.click()
    toast(`Appointment ${secondParam}`)
  };

  const onSubmitParams = (secondParam: string) => {
    return (values: z.infer<typeof formSchema>) => handleSubmit(values, secondParam);
  }

  const handleDelete = () => {
    const newDate = {
      id_agenda: -1,
      id_paciente: null,
      fecha: day,
      hora: editAppointment!.hora,
      ape_nom: null,
    }
    changeAgenda(editAppointment!, newDate)
    toast("Appointment Deleted")
    document.getElementById("close-sheet")?.click()
  }

  return (
    <main className="col-span-12 grid grid-cols-12 mt-2 mx-3 overflow-auto animate-fade-in">
    {hours.map((hour, index) => (
      <Sheet key={index} >
        <SheetTrigger className="col-span-12">
          <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-blue-100 mx-1 duration-150">
            <div className="w-14 h-12 flex justify-center items-center text-sm border-b border-r border-gray-300">
              {hour}
            </div>
            <div className="w-full border-b h-12 py-0 border-gray-300">
            { agenda.some((item) => item.hora === hour && item.fecha === day)
              ? agenda.map((item, index) =>
                item.hora === hour && item.fecha === day
                  ? item.id_agenda !== -1
                      ? <div key={index} onClick={() => handleDate(item)} className="h-12 text-start text-sm md:text-base bg-blue-200 w-full z-10 flex items-center px-2 hover:bg-blue-600 text-black/70 hover:text-white duration-150 animate-fade-in">Patient: {item.ape_nom}</div>
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
            <SheetDescription className="text-start px-4">
              Fill the fields to complete the Appointment
            </SheetDescription>
            <Form {...form}>
              <FormDescription className="w-full flex flex-col text-center text-xl font-semibold">
                <span>{editAppointment?.fecha.substring(0,10)}</span>
                <span className="text-lg">{editAppointment?.hora}</span>
              </FormDescription>
              <form className="flex flex-col gap-4 px-4">
                <FormField control={form.control} name="fecha" render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} value={editAppointment?.fecha} disabled/>
                      </FormControl>
                      <FormMessage className="text-xs animate-fade-in" />
                    </FormItem>
                  )
                }}>
                </FormField>
                <FormField control={form.control} name="hora" render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
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
                    <FormItem>
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
                  ? <SheetFooter className="!flex !flex-col my-2 gap-2">
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
                    </SheetFooter>
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