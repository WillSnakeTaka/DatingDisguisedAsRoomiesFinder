import Image from "next/image";
import { SearchParams } from 'next/dist/server/request/search-params';
import Hero from "../components/HomePage/Hero";
import About from "../components/About";
import Footer from "../components/Footer";
export default function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero imageUrl='/property2.jpg' imageAlt="property" heading="" />

      <main className="flex-grow">
        {/* main content here */}
        <h1 className="text-center py-16">Welcome to RooMe</h1>
      </main>


      <About />
      <Footer />
    </div>
  );
}
