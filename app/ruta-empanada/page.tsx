import Image from "next/image"
//import { GET } from "../api/empanada/route"
import AddEmpanada from "./add-empanada"
import ListEmpanada from "./list-empanada"
import { GetAllEmpanadas } from "@/actions/empanada"
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/mode-toogle";

export default async function RutaEmpanada() {
  const data = await GetAllEmpanadas();
  //console.log(data, "data")
  return (
    <div className="mx-auto w-full py-4 relative text-neutral-900 dark:text-neutral-100">
      <Image src="/images/empanadas.webp" width={800} height={1200} priority alt="logoEmpa" className="h-screen w-screen fixed -z-20 object-contain" />
      <div className="inset-0 w-full h-screen fixed bg-white/70 dark:bg-black/70 -z-10"></div>
      <header className="px-6 text-center font-semibold py-2">
        <h1 className="text-xl">
          Ruta de la empanada
        </h1>
        <h4 className="text-xs italic">
          Por Luis y Gabriela
        </h4>
      </header>
      <ListEmpanada data={data} />
      <AddEmpanada />
      <div className="absolute top-2 right-2">
      <ModeToggle />
      </div>
        <Toaster />
    </div>
  )
}