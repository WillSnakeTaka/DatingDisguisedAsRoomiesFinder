import ListingList from '@/app/components/listings/ListingList';
import { getListings } from '@/app/actions/listings/getListings';

const Page = async () => {
    const listings = await getListings();

    return (
        <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Featured Listings</h1>
            <ListingList listings={listings} />
        </div>

    );
};

export default Page;
