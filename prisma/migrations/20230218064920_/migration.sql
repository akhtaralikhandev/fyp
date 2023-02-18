/*
  Warnings:

  - You are about to drop the column `batch_no` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contact_no]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_no` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batch_no",
ADD COLUMN     "contact_no" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_contact_no_key" ON "Student"("contact_no");
