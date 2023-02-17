/*
  Warnings:

  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.
  - The `role` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coordinator_email` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `faculty_name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `faculty_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `regNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Coordinators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departement_name]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch_no` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departement_name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('COORDINATOR', 'ADVISOR', 'CO_ADVISOR');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Coordinators" DROP CONSTRAINT "Coordinators_email_fkey";

-- DropForeignKey
ALTER TABLE "Coordinators" DROP CONSTRAINT "Coordinators_faculty_name_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_coordinator_email_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_faculty_name_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_project_id_fkey";

-- DropIndex
DROP INDEX "Project_project_id_key";

-- DropIndex
DROP INDEX "Student_contact_key";

-- DropIndex
DROP INDEX "Student_faculty_name_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "username",
ADD COLUMN     "departmentId" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "EmployeeRole" DEFAULT 'COORDINATOR';

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "coordinator_email",
DROP COLUMN "faculty_name",
DROP COLUMN "project_id",
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "contact",
DROP COLUMN "faculty_name",
DROP COLUMN "project_id",
DROP COLUMN "regNo",
DROP COLUMN "username",
ADD COLUMN     "batch_no" INTEGER NOT NULL,
ADD COLUMN     "departement_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "reg_no" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("reg_no");

-- DropTable
DROP TABLE "Coordinators";

-- DropTable
DROP TABLE "Faculty";

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee_Department" (
    "employee_email" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "Employee_Department_pkey" PRIMARY KEY ("department_name","employee_email")
);

-- CreateTable
CREATE TABLE "Employee_Project" (
    "project_id" INTEGER NOT NULL,
    "employee_email" TEXT NOT NULL,

    CONSTRAINT "Employee_Project_pkey" PRIMARY KEY ("project_id","employee_email")
);

-- CreateTable
CREATE TABLE "Coordinator" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Coordinator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_departmentId_key" ON "Project"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_departement_name_key" ON "Student"("departement_name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departement_name_fkey" FOREIGN KEY ("departement_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Department" ADD CONSTRAINT "Employee_Department_employee_email_fkey" FOREIGN KEY ("employee_email") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Department" ADD CONSTRAINT "Employee_Department_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Project" ADD CONSTRAINT "Employee_Project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Project" ADD CONSTRAINT "Employee_Project_employee_email_fkey" FOREIGN KEY ("employee_email") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinator" ADD CONSTRAINT "Coordinator_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
