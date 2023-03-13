import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const checkSuperAdmin = async (req) => {
  const superadmin = await prisma.superAdmin.findFirst();
  if (superadmin) {
    return true;
  }
  return false;
};
