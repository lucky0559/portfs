import Image from "next/image";
import HomePage from "./pages/home/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-primaryBackground p-10">
      <HomePage />
    </main>
  );
}
