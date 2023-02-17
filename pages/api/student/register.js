import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, password, email, batch_no, reg_no } = req.body;
      const student = await prisma.student.create({
        data: {
          name: name,
          email: email,
          password: password,
          reg_no: parseInt(reg_no),
          batch_no: parseInt(batch_no),
        },
      });
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

export default handler;
