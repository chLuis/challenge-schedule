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
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useDatesStore } from "@/stores/date/date.store";
import { useDayStore } from "@/stores/day/day.store"
import { hours } from "@/constants";
import { Cita } from "@/types/cita";
import { X } from "lucide-react";


export const Plan = () => {
  const day = useDayStore((state) => state.day)
  const agenda = useDatesStore((state) => state.dates)
  const changeDate = useDatesStore((state) => state.changeDate)
  //const addDate = useDatesStore((state) => state.addDate)
  //const borrarCita = useDatesStore((state) => state.removeDate)
  //const [ agendaToday, setAgendaToday ] = React.useState<Cita[]>([])
  const [ editDate, setEditDate ] = React.useState<Cita | undefined>(undefined)
  const [isOpen, setIsOpen] = React.useState(false);

  // React.useMemo(() => {
  //   setAgendaToday(agenda.filter((item) => item.fecha === day))

  // }, [agenda, day])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ape_nom: editDate?.ape_nom ?? "",
      hora: editDate?.hora ?? "",
      fecha: editDate?.fecha ?? "",
      id_agenda: editDate?.id_agenda ?? 0,
      id_paciente: editDate?.id_paciente ?? 0,
    },
  });

  React.useEffect(() => {
    if (editDate) {
      form.reset({
        ape_nom: editDate.ape_nom || "",
        hora: editDate.hora || "",
        fecha: editDate.fecha || "",
        id_agenda: editDate.id_agenda || 0,
        id_paciente: editDate.id_paciente || 0,
      });
    }
  }, [editDate, form]);

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

  
  



  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    //console.log("BOTON");
    //console.log({ values });
    //console.log(editDate);
    //borrarCita(values)
    changeDate(editDate!, values)
    //addDate(values)
    setIsOpen(false)
  };

  const handleDelete = () => {
    const newDate = {
      id_agenda: -1,
      id_paciente: null,
      fecha: day,
      hora: editDate!.hora,
      ape_nom: null,
    }
    //console.log(newDate);
    changeDate(editDate!, newDate)
    setIsOpen(false)

    }
  return (
    <main className="col-span-12 grid grid-cols-12 mt-20 mx-3 overflow-auto">
    {hours.map((hour, index) => (
      <Sheet key={index} open={isOpen} >
        <SheetTrigger className="col-span-12 " onClick={() => setIsOpen(!isOpen)}>
          <div className="col-span-12 flex flex-nowrap h-12 gap-0 hover:bg-blue-100 mx-1 duration-150">
            <div className="w-14 h-12 flex justify-center items-center text-sm border-b border-r border-gray-300">
              {hour}
            </div>
            <div className="w-full border-b h-12 py-0 border-gray-300">
            { agenda.some((item) => item.hora === hour && item.fecha === day)
              ? agenda.map((item, index) =>
                item.hora === hour && item.fecha === day
                  ? item.id_agenda !== -1
                      ? <div key={index} onClick={() => handleDate(item)} className="h-12 bg-blue-300 w-full z-10 flex items-center px-2 hover:bg-blue-600 text-black/70 hover:text-white duration-150">Patient: {item.ape_nom}</div>
                      : <div key={index} onClick={() => handleNewDate(hour)} className="h-12 py-0"></div>
                  : null
                )
              : <div key={hour} onClick={() => handleNewDate(hour)} className="w-full h-12 py-0"></div>
            }
            </div>
          </div>
        </SheetTrigger>
          <SheetOverlay className=" opacity-5 animate-in" onClick={() => setIsOpen(false)}/>
        <SheetContent side={"left"} className="shadow-none">
          <div className="select-none flex justify-end items-center w-full ">
            <X onClick={() => setIsOpen(false)}  className="cursor-pointer p-1"/>
          </div>
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
                        <Input {...field} type="number"/>
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
                        <Input {...field} type="number"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}>
                </FormField>
                {editDate?.id_agenda !== -1 && editDate?.id_agenda !== null
                  ? <div className="flex flex-col my-2 gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" className="bg-blue-500 hover:bg-blue-700 text-white">Update</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-5/6">
                          <DialogHeader className="gap-4">
                            <DialogTitle className="uppercase">Updating meet</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will updating your meet, confirm?
                            </DialogDescription>
                        <Button type="button" onClick={form.handleSubmit(handleSubmit)} className="bg-blue-500 hover:bg-blue-700 text-white">Confirm</Button>
                        {/* <Button onClick={(e) => handleDelete(e)} className="bg-red-500 hover:bg-red-700 text-white">Confirm</Button> */}
                        </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="ghost">Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-5/6">
                          <DialogHeader className="gap-4">
                            <DialogTitle className="uppercase">Deleting meet</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your meet
                            </DialogDescription>
                        <Button onClick={() => handleDelete()} className="bg-red-500 hover:bg-red-700 text-white">Confirm</Button>
                        </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  : <Button type="button" onClick={form.handleSubmit(handleSubmit)} className="bg-blue-500 hover:bg-blue-700 my-2 w-full">Create</Button>
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
  ape_nom: z.string()
    .min(4, {message: "Fullname must be at least 4 characters." })
    .max(36,  {message: "Fullname must be at most 36 characters",}),
  id_paciente: z.coerce.number()
    .min(1, {message: "ID patient must be at least 1 digit." })
    .max(999999, {message: "ID patiente must be in the range 1 to 999999." })
    .positive({message:"ID patient must be positive"}),
  fecha: z.string()
    .min(10, {message: "Date must be at least 10 characters.",  }),
  hora: z.string()
    .min(4, { message: "Timme must be at least 4 characters."}),
  id_agenda: z.coerce.number()
    .min(1, { message: "ID Agenda must be at least 1 numbers." })
    .max(999999, { message: "ID Agenda must be in the range 1 to 999999." })

})