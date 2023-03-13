import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import { checkSuperAdmin } from "./middleware";
const handler = async (req, res) => {
  const { name, email, password } = req.body;
  if (req.method === "POST") {
    const isSuperAdmin = await checkSuperAdmin(req);
    if (isSuperAdmin) return res.status(403).json("Super admin already exist");
    try {
      const superAdmin = await prisma.superAdmin.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      return res.status(200).json(superAdmin);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
};
export default handler;
