import { z } from "zod";

export const formSchema = z.object({
  ape_nom: z.string()
    .min(4, {message: "Fullname must be at least 4 characters." })
    .max(36,  {message: "Fullname must be at most 36 characters",}),
  id_paciente: z.coerce.number()
    .min(1, {message: "ID patient must be at least 1 digit." })
    .max(999999, {message: "ID patiente must be in the range 1 to 999999." })
    .positive({message:"ID patient must be positive"}),
  fecha: z.string()
    .min(10, {message: "Date must be at least 10 characters."})
    .max(30, {message: "Date must be in the range 30 characters."}),
  hora: z.string()
    .min(4, { message: "Timme must be at least 4 characters."})
    .max(8 , { message: "Time must be in the range 4 to 8 characters." }),
  id_agenda: z.coerce.number()
    .min(1, { message: "ID Agenda must be at least 1 numbers." })
    .max(999999, { message: "ID Agenda must be in the range 1 to 999999." })
})