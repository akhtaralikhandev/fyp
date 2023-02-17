-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_departement_name_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "departement_name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_departement_name_fkey" FOREIGN KEY ("departement_name") REFERENCES "Department"("name") ON DELETE SET NULL ON UPDATE CASCADE;
