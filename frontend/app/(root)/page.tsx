import Image from "next/image";
import { SearchParams } from 'next/dist/server/request/search-params';
import Hero from "../components/HomePage/Hero";

export default function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  return (
    <div>
      <h1>RoomMe Home Page</h1>

      <Hero />
      <div className="">About </div>
      <div className="">Footer </div>
    </div>
  );
}
