/*
  Warnings:

  - A unique constraint covering the columns `[coordinator_email]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "coordinator_email" TEXT NOT NULL DEFAULT 'abc@gmail.com';

-- CreateIndex
CREATE UNIQUE INDEX "Department_coordinator_email_key" ON "Department"("coordinator_email");
