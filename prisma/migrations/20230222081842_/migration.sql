/*
  Warnings:

  - You are about to drop the column `student_email` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_student_email_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "student_email";
