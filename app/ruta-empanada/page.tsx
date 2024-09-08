import Image from "next/image"
//import { GET } from "../api/empanada/route"
import AddEmpanada from "./add-empanada"
import ListEmpanada from "./list-empanada"
import { GetAllEmpanadas } from "@/actions/empanada"
import { Toaster } from "@/components/ui/toaster";

export default async function RutaEmpanada() {
  const data = await GetAllEmpanadas();
  //console.log(data, "data")
  return (
    <div className="mx-auto w-full py-4 relative">
      <Image src="/images/empanadas.webp" width={800} height={1200} priority alt="logoEmpa" className="h-screen w-screen fixed -z-20 object-contain" />
      <div className="inset-0 w-full h-screen fixed bg-black/70 -z-10"></div>
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
      <Toaster />
    </div>
  )
}