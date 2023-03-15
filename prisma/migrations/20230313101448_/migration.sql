/*
  Warnings:

  - You are about to drop the column `panelId` on the `Presentation_Scedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Presentation_Scedule" DROP CONSTRAINT "Presentation_Scedule_panelId_fkey";

-- AlterTable
ALTER TABLE "Presentation_Scedule" DROP COLUMN "panelId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "presentation_SceduleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_presentation_SceduleId_fkey" FOREIGN KEY ("presentation_SceduleId") REFERENCES "Presentation_Scedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
