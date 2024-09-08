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
    <div className="flex flex-col items-center">
      {data?.map((empanada) => (
        <div key={empanada._id} className="border p-4 min-w-48">
          <h2>{empanada.Nombre}</h2>
          {Array.from({ length: empanada.Estrellas }).map((_, index) => (
            <span key={index}>&#9733;</span>
          ))}
          <p>{empanada.Domicilio}</p>
          <p>$ {empanada.Precio}</p>
          <p>{empanada.Descripcion}</p>
          <p className="text-xs italic">{empanada.Autor}</p>
        </div>
      ))}
    </div>
  );
}
