-- AlterTable
CREATE SEQUENCE presentation_scedule_presentation_number_seq;
ALTER TABLE "Presentation_Scedule" ALTER COLUMN "Presentation_number" SET DEFAULT nextval('presentation_scedule_presentation_number_seq'),
ALTER COLUMN "Start_time" DROP NOT NULL,
ALTER COLUMN "End_time" DROP NOT NULL;
ALTER SEQUENCE presentation_scedule_presentation_number_seq OWNED BY "Presentation_Scedule"."Presentation_number";

-- CreateTable
CREATE TABLE "Panel_Employee" (
    "id" SERIAL NOT NULL,
    "panelId" INTEGER,
    "employeeEmail" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Panel_Employee_id_key" ON "Panel_Employee"("id");

-- AddForeignKey
ALTER TABLE "Panel_Employee" ADD CONSTRAINT "Panel_Employee_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panel_Employee" ADD CONSTRAINT "Panel_Employee_employeeEmail_fkey" FOREIGN KEY ("employeeEmail") REFERENCES "Employee"("email") ON DELETE SET NULL ON UPDATE CASCADE;
