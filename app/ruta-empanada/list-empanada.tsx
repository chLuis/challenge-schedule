
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
  return (
    <div className="flex flex-col items-center gap-2 text-neutral-900 dark:text-neutral-100">
      {data?.map((empanada) => (
        <div key={empanada._id} className="border border-black/50 dark:border-white/50 rounded-md pb-4 px-4 min-w-60 w-60 max-w-60 bg-white/80 dark:bg-black/50">
          <div className="flex justify-end">
            {Array.from({ length: empanada.Estrellas }).map((_, index) => (
            <span key={index} className="text-yellow-300 text-end">&#9733;</span>
          ))}
          </div>
          <h2 className="font-bold text-xl text-center">{empanada.Nombre}</h2>
          <p className="text-xs text-center pb-3">{empanada.Domicilio}</p>
          <p>{empanada.Descripcion}</p>
          <p className="pt-3">$ {empanada.Precio}</p>
          <p className="text-xs italic pt-4 text-end">{empanada.Autor}</p>
        </div>
      ))}
    </div>
  );
}
