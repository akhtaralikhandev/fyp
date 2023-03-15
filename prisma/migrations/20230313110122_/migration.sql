/*
  Warnings:

  - You are about to drop the column `panelNumber` on the `Panel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_panelNumber_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_panelNumber_fkey";

-- DropIndex
DROP INDEX "Panel_panelNumber_key";

-- DropIndex
DROP INDEX "Project_panelNumber_key";

-- AlterTable
ALTER TABLE "Panel" DROP COLUMN "panelNumber";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_panelNumber_fkey" FOREIGN KEY ("panelNumber") REFERENCES "Panel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_panelNumber_fkey" FOREIGN KEY ("panelNumber") REFERENCES "Panel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
