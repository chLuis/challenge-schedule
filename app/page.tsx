import { GET } from "@/actions/data";
import { CalendarComponent } from "@/components/calendar";
import { Header } from "@/components/header";
import { Schedule } from "@/components/schedule";

export default async function Home() {
  const data = await GET();

  return (
    <main className="grid grid-cols-12 pb-4 lg:h-screen content-start overflow-clip dark:bg-neutral-800">
      <Header />
      <CalendarComponent />
      <Schedule initialData={data}/>
    </main>
  );
}
