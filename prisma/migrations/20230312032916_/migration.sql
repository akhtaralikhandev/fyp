/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Employee_Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee_Project" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Project_id_key" ON "Employee_Project"("id");
