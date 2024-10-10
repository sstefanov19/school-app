-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);
