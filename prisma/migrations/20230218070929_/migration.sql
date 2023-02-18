/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - Added the required column `department_name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_email` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_departmentId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "departmentId",
DROP COLUMN "name",
ADD COLUMN     "department_name" TEXT NOT NULL,
ADD COLUMN     "student_email" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
