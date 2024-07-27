import { GET } from "@/actions/data";
import { CalendarComponent } from "@/components/calendar";
import { Day } from "@/components/day";
import { Header } from "@/components/header";
//import { GET } from "./api/data/route";

export default async function Home() {
  const data = await GET();

  return (
    <main className="grid grid-cols-12 pb-4 h-screen max-h-screen content-start overflow-clip">
      <Header />
      <CalendarComponent citas={data}/>
      <Day />
    </main>
  );
}
