'use client'
import React from "react";
import Image from "next/image";
import DeleteEmpa from "./delete-empanada";
import { Edit2Icon, LucideSettings } from "lucide-react";

interface Empanada {
  _id: string;
  Nombre: string;
  Domicilio: string;
  Descripcion: string;
  Precio: number;
  Estrellas: number;
  Autor: string;
}

export default function ListEmpanada({data} : {data: Empanada[]}) {
  const [editOptions, setEditOptions] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-2 text-neutral-900 dark:text-neutral-100">
      {data?.map((empanada) => (
        <div key={empanada._id} className="border border-black/50 dark:border-white/50 rounded-md pb-4 px-4 min-w-60 w-60 max-w-60 bg-white/80 dark:bg-black/50">
          <div className="flex justify-end pt-2">
            {Array.from({ length: empanada.Estrellas }).map((_, index) => (
            <Image key={index} src='/images/empanada.webp' alt="empana" width={16} height={16} className="w-auto h-auto"/>
          ))}
          </div>
          <h2 className="font-bold text-xl text-center">{empanada.Nombre}</h2>
          <p className="text-xs text-center pb-3">{empanada.Domicilio}</p>
          <p>{empanada.Descripcion}</p>
          <p className="pt-3">$ {empanada.Precio}</p>
          <p className="text-xs italic pt-4 text-end">{empanada.Autor}</p>
          {editOptions
            ? <div className="flex gap-2 justify-end pt-2">
              <Edit2Icon className="w-6 h-6 animate-bounce text-blue-600" />
              <DeleteEmpa id={empanada._id} />
            </div>
            : null}
        </div>
      ))}
    <LucideSettings onClick={() => setEditOptions(!editOptions)} className={`${editOptions ? 'animate-spin bg-purple-700' : 'bg-neutral-600'} fixed bottom-16 right-4 border text-white dark:text-white rounded-full p-2 stroke-2 w-10 h-10`} />
    </div>
  );
}
