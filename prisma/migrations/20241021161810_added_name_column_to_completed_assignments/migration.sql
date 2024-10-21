/*
  Warnings:

  - Added the required column `name` to the `CompletedAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompletedAssignment" ADD COLUMN     "name" TEXT NOT NULL;
