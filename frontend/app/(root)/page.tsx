import Hero from "../components/homePage/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="flex flex-col min-h-screen">
      <Hero imageUrl="/property2.jpg" imageAlt="property" heading="Find your ideal roommate" />

      <main className="flex-grow px-4 md:px-16 py-10">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to RooMe</h1>
          <p className="text-lg text-gray-600">
            RooMe is a platform that connects people with potential roommates and shared housing
            opportunities. Our mission is to simplify the rental process, making it easier to find
            the right fit and secure a place to call home.
          </p>
        </section>
      </main>

      <About imageUrl="/coliving-1.jpg" imageAlt="property" heading="Find your ideal roommate" />
      <Footer />
    </div>
  );
}
