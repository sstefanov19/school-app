/*
  Warnings:

  - Added the required column `subject` to the `Assignement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignement" ADD COLUMN     "subject" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CompletedAssignment" (
    "assignmentId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "CompletedAssignment_pkey" PRIMARY KEY ("assignmentId","studentId")
);

-- AddForeignKey
ALTER TABLE "CompletedAssignment" ADD CONSTRAINT "CompletedAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedAssignment" ADD CONSTRAINT "CompletedAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
