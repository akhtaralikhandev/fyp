-- DropForeignKey
ALTER TABLE "Panel_Employee" DROP CONSTRAINT "Panel_Employee_panelId_fkey";

-- DropForeignKey
ALTER TABLE "Presentation_Scedule" DROP CONSTRAINT "Presentation_Scedule_panelId_fkey";

-- AlterTable
ALTER TABLE "Panel_Employee" ADD COLUMN     "panle_Projects_employeesId" INTEGER;

-- CreateTable
CREATE TABLE "Panel_Projects_employees" (
    "id" SERIAL NOT NULL,
    "panelId" INTEGER NOT NULL,
    "presentation_SceduleId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Panel_Projects_employees_id_key" ON "Panel_Projects_employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Panel_Projects_employees_panelId_key" ON "Panel_Projects_employees"("panelId");

-- AddForeignKey
ALTER TABLE "Panel_Projects_employees" ADD CONSTRAINT "Panel_Projects_employees_presentation_SceduleId_fkey" FOREIGN KEY ("presentation_SceduleId") REFERENCES "Presentation_Scedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panel_Projects_employees" ADD CONSTRAINT "Panel_Projects_employees_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panel_Employee" ADD CONSTRAINT "Panel_Employee_panle_Projects_employeesId_fkey" FOREIGN KEY ("panle_Projects_employeesId") REFERENCES "Panel_Projects_employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
