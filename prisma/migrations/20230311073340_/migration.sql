/*
  Warnings:

  - You are about to drop the `Project_Supervisor_Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project_Supervisor_Request" DROP CONSTRAINT "Project_Supervisor_Request_projectId_fkey";

-- AlterTable
ALTER TABLE "Employee_Project" ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Project_Supervisor_Request";
