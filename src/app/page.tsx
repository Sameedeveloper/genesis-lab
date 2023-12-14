//@ts-nocheck
"use client"
import CosmicCard from "@/components/CosmicCard";
import ClassicCard from "@/components/ClassicCard";
import AtomicCard from "@/components/AtomicCard";




export default function Home() {

  return (
    <main className="flex flex-col min-h-screen items-start p-4 space-y-4">
    <CosmicCard/>
    <ClassicCard/>
    <AtomicCard/>
    </main>
  );
}

