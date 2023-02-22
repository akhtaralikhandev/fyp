/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `Coordinator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coordinator_departmentId_key" ON "Coordinator"("departmentId");
