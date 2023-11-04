import { getSupabase } from "@/lib/supabase";
import { currentUserActions } from "@/lib/userActions";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <section>
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tighter">Home</h1>
        </div>
      </section>
    </main>
  );
}
