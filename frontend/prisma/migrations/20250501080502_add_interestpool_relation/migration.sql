/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `interestPool` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `creator_clerkId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_clerkId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "clerkId",
DROP COLUMN "interestPool",
ADD COLUMN     "creator_clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cleanliness" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "pets" INTEGER,
ADD COLUMN     "smoking" INTEGER;

-- CreateTable
CREATE TABLE "_ListingInterestPool" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ListingInterestPool_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ListingInterestPool_B_index" ON "_ListingInterestPool"("B");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_creator_clerkId_fkey" FOREIGN KEY ("creator_clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingInterestPool" ADD CONSTRAINT "_ListingInterestPool_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingInterestPool" ADD CONSTRAINT "_ListingInterestPool_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
