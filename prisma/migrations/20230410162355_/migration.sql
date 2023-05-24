/*
  Warnings:

  - You are about to drop the column `presentation_SceduleId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_presentation_SceduleId_fkey";

-- AlterTable
ALTER TABLE "Presentation_Scedule" ADD COLUMN     "projectId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'this is it ';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "presentation_SceduleId";

-- AddForeignKey
ALTER TABLE "Presentation_Scedule" ADD CONSTRAINT "Presentation_Scedule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
