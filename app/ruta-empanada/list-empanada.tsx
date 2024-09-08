interface Empanada {
  _id: string;
  Nombre: string;
  Domicilio: string;
  Precio?: number;
  Estrellas: number;
  Autor?: string;
}

export default function ListEmpanada({data} : {data: Empanada[]}) {
  return (
    <div className="flex flex-col items-center">
      {data.map((empanada) => (
        <div key={empanada._id} className="border p-4 min-w-48">
          <h2>{empanada.Nombre}</h2>
          <p>{empanada.Domicilio}</p>
          <p>{empanada.Precio}</p>
          {Array.from({ length: empanada.Estrellas }).map((_, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </div>
      ))}
    </div>
  );
}
