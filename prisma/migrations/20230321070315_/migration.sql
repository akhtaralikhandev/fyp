-- CreateEnum
CREATE TYPE "PresentationStatus" AS ENUM ('PENDING', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Presentation_Scedule" ADD COLUMN     "status" "PresentationStatus" NOT NULL DEFAULT 'PENDING';
