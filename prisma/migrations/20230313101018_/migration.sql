/*
  Warnings:

  - You are about to drop the `Panel_Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Panel_Projects_employees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Panel_Employee" DROP CONSTRAINT "Panel_Employee_employeeEmail_fkey";

-- DropForeignKey
ALTER TABLE "Panel_Employee" DROP CONSTRAINT "Panel_Employee_panle_Projects_employeesId_fkey";

-- DropForeignKey
ALTER TABLE "Panel_Projects_employees" DROP CONSTRAINT "Panel_Projects_employees_panelId_fkey";

-- DropForeignKey
ALTER TABLE "Panel_Projects_employees" DROP CONSTRAINT "Panel_Projects_employees_presentation_SceduleId_fkey";

-- DropForeignKey
ALTER TABLE "Rubrics" DROP CONSTRAINT "Rubrics_evaluator_fkey";

-- DropIndex
DROP INDEX "Presentation_Scedule_panelId_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "panelId" INTEGER;

-- DropTable
DROP TABLE "Panel_Employee";

-- DropTable
DROP TABLE "Panel_Projects_employees";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presentation_Scedule" ADD CONSTRAINT "Presentation_Scedule_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
