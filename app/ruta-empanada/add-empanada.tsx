'use client';
import React from "react";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { LucidePlus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { empanadaSchema } from "@/schemas/form";
import { POST } from "../api/empanada/route";
import { PostEmpanada } from "@/actions/empanada";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddEmpanada() {


  const form = useForm<z.infer<typeof empanadaSchema>>({
    resolver: zodResolver(empanadaSchema),
    defaultValues: {
      Nombre: "",
      Domicilio: "",
      Precio: undefined,
      Estrellas: undefined,
      Autor: ""
    },
  });

  async function handleSubmit(values: z.infer<typeof empanadaSchema>) {
    console.log(values);
    try {
      const res = await PostEmpanada(values)
      console.log(res);
      form.reset();
      document.getElementById("close-sheet")?.click()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sheet>
    <SheetTrigger className="fixed bottom-4 right-4">
        <LucidePlus className="border rounded-full p-1 stroke-2 text-xl w-8 h-8 bg-green-600" />
    </SheetTrigger>
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Agregar reseña</SheetTitle>
        {/* <SheetDescription>
          
        </SheetDescription> */}
        <Form {...form} >
            <form className="flex flex-col gap-4 px-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField control={form.control} name="Nombre" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-xs animate-fade-in" />
                  </FormItem>
                )
              }}>
              </FormField>
              <FormField control={form.control} name="Domicilio" render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-xs animate-fade-in" />
                  </FormItem>
                )
              }}>
                </FormField>
              <FormField control={form.control} name="Precio" render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage className="text-xs animate-fade-in" />
                  </FormItem>
                )
              }}>
                </FormField>
              <FormField control={form.control} name="Estrellas" render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Estrellas</FormLabel>
                    <FormControl>
                      <Input {...field} type="number"/>
                    </FormControl>
                    <FormMessage className="text-xs animate-fade-in" />
                  </FormItem>
                )
              }}>
                </FormField>
              <FormField control={form.control} name="Autor" render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Elegir" />
                        </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Luis"}>Luis</SelectItem>
                            <SelectItem value={"Gabriela"}>Gabriela</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    <FormMessage className="text-xs animate-fade-in" />
                  </FormItem>
                )
              }}>
                </FormField>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 my-2 w-full">
                  Crear
                </Button>
              
            </form>
          </Form>
      </SheetHeader>
      
      <SheetFooter>
        <SheetClose id="close-sheet">
          
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
