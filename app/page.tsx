import { GET } from "@/actions/data";
import { BodyCalendar } from "@/components/body-calendar";
import { Header } from "@/components/header";

export default async function Home() {
  const data = await GET();

  return (
    <main className="grid grid-cols-12 pb-4 w-full lg:h-screen content-start dark:bg-neutral-800">
      <Header />
      <BodyCalendar data={data}/>
    </main>
  );
}
