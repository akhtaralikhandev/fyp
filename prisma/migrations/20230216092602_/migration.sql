/*
  Warnings:

  - You are about to drop the column `coordinator` on the `Faculty` table. All the data in the column will be lost.
  - Added the required column `coordinator_email` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Faculty_coordinator_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "coordinator";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "coordinator_email" TEXT NOT NULL,
ADD COLUMN     "faculty_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Coordinators" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "faculty_name" TEXT NOT NULL,

    CONSTRAINT "Coordinators_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinators_email_key" ON "Coordinators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinators_faculty_name_key" ON "Coordinators"("faculty_name");

-- AddForeignKey
ALTER TABLE "Coordinators" ADD CONSTRAINT "Coordinators_email_fkey" FOREIGN KEY ("email") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinators" ADD CONSTRAINT "Coordinators_faculty_name_fkey" FOREIGN KEY ("faculty_name") REFERENCES "Faculty"("faculty_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_coordinator_email_fkey" FOREIGN KEY ("coordinator_email") REFERENCES "Coordinators"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_faculty_name_fkey" FOREIGN KEY ("faculty_name") REFERENCES "Faculty"("faculty_name") ON DELETE RESTRICT ON UPDATE CASCADE;
