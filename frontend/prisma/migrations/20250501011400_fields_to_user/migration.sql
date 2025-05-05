/*
  Warnings:

  - You are about to drop the `_UserHobbies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserHobbies" DROP CONSTRAINT "_UserHobbies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserHobbies" DROP CONSTRAINT "_UserHobbies_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "max_budget" INTEGER,
ADD COLUMN     "min_budget" INTEGER;

-- DropTable
DROP TABLE "_UserHobbies";
