-- CreateTable
CREATE TABLE "Assignement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "Assignement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignement" ADD CONSTRAINT "Assignement_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
