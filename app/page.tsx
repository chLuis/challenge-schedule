import { GET } from "@/actions/data";
import { CalendarComponent } from "@/components/calendar";
import { Header } from "@/components/header";
import { Schedule } from "@/components/schedule";

export default async function Home() {
  const data = await GET();

  return (
    <main className="grid grid-cols-12 pb-4 w-full lg:h-screen content-start overflow-clip dark:bg-neutral-800">
      <Header />
      <div className="col-span-12 w-[90%] grid grid-cols-12 mx-auto">
        <CalendarComponent />
        <Schedule initialData={data} />
      </div>
    </main>
  );
}
