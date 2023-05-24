import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  const { reg_no, projectId } = req.query;
  const { remove } = req.body;
  if (req.method === "PUT" && remove) {
    try {
      const student2 = await prisma.student.findFirst({
        where: { reg_no: parseInt(reg_no) },
      });
      if (!student2) return res.status(404).json("Student not found");
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: {
          project: {
            disconnect: true,
          },
        },
      });
      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      const student2 = await prisma.student.findFirst({
        where: { reg_no: parseInt(reg_no) },
      });
      if (!student2) return res.status(404).json("Student not found");
      const alreadyPart = await prisma.student.findFirst({
        where: {
          reg_no: parseInt(reg_no),
          projectId: { not: null },
        },
      });
      if (alreadyPart)
        return res.status(403).json("student already part of a group");
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: {
          project: {
            connect: { id: parseInt(projectId) },
          },
        },
      });
      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export default handler;
