/*
  Warnings:

  - You are about to drop the column `department_Id` on the `Employee` table. All the data in the column will be lost.
  - The `role` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "department_Id",
ADD COLUMN     "departement_name" TEXT,
ADD COLUMN     "role2" "EmployeeRole" DEFAULT 'COORDINATOR',
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'employee';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'student';
