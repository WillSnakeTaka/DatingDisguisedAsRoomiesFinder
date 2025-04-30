-- CreateTable
CREATE TABLE "ListingHobby" (
    "listingId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,

    CONSTRAINT "ListingHobby_pkey" PRIMARY KEY ("listingId","hobbyId")
);

-- AddForeignKey
ALTER TABLE "ListingHobby" ADD CONSTRAINT "ListingHobby_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingHobby" ADD CONSTRAINT "ListingHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
