import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { reg_no } = req.body;
    try {
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: { projectId: null },
      });
      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
};

export default handler;
