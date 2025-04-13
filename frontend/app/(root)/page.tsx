import Image from "next/image";
import { SearchParams } from 'next/dist/server/request/search-params';
import Hero from "../components/homePage/Hero";
import About from "../components/About";
import Footer from "../components/Footer";
import { cookies } from 'next/headers'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Hero imageUrl='/property2.jpg' imageAlt="property" heading="" />

      <main className="flex-grow">
        {/* main content here */}
        <h1 className="text-center py-16">Welcome to RooMe</h1>
        <p>
          RooMe is a platform that connects people with other potential tenants.
          Our goal is to simplify the rental process for people, making it easier to find and secure rental properties.
        </p>

      </main>

      <About />
      <Footer />
    </div>
  );
}
