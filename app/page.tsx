import { GET } from "@/actions/data";
import { CalendarComponent } from "@/components/calendar";
import { Header } from "@/components/header";
import { Schedule } from "@/components/schedule";

export default async function Home() {
  const data = await GET();

  return (
    <main className="grid grid-cols-12 pb-4 h-screen max-h-screen content-start overflow-clip">
      <Header />
      <CalendarComponent citas={data}/>
      <Schedule />
    </main>
  );
}
