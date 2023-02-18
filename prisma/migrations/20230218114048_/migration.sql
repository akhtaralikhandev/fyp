/*
  Warnings:

  - A unique constraint covering the columns `[contact_no]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_no` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "contact_no" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contact_no_key" ON "Employee"("contact_no");
