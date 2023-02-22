/*
  Warnings:

  - A unique constraint covering the columns `[student_email]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_student_email_key" ON "Project"("student_email");
