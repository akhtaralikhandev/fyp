/*
  Warnings:

  - You are about to drop the column `panelId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `panel_id` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[panelNumber]` on the table `Panel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panelNumber]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `panelNumber` to the `Panel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_panelId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_panel_id_fkey";

-- DropIndex
DROP INDEX "Project_panel_id_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "panelId",
ADD COLUMN     "panelNumber" INTEGER;

-- AlterTable
ALTER TABLE "Panel" ADD COLUMN     "panelNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "panel_id",
ADD COLUMN     "panelNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Panel_panelNumber_key" ON "Panel"("panelNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Project_panelNumber_key" ON "Project"("panelNumber");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_panelNumber_fkey" FOREIGN KEY ("panelNumber") REFERENCES "Panel"("panelNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_panelNumber_fkey" FOREIGN KEY ("panelNumber") REFERENCES "Panel"("panelNumber") ON DELETE SET NULL ON UPDATE CASCADE;
