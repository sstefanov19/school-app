-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "account_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "account_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("account_id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
