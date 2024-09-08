
import { revalidatePath } from "next/cache";


export async function GET() {
  revalidatePath('/ruta-empanada')
  return Response.json({revalidated: true})
}
