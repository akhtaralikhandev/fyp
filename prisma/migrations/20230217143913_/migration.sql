/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[reg_no]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "reg_no" DROP DEFAULT;
DROP SEQUENCE "Student_reg_no_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Student_reg_no_key" ON "Student"("reg_no");
