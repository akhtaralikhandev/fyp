/*
  Warnings:

  - Added the required column `superAdmin` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "superAdmin" BOOLEAN NOT NULL;
