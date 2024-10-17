/*
  Warnings:

  - You are about to drop the column `classId` on the `Assignement` table. All the data in the column will be lost.
  - Added the required column `grade` to the `Assignement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignement" DROP CONSTRAINT "Assignement_classId_fkey";

-- AlterTable
ALTER TABLE "Assignement" DROP COLUMN "classId",
ADD COLUMN     "grade" INTEGER NOT NULL;
