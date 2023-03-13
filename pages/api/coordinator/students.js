import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { projectId } = req.query;
    console.log(projectId);
    try {
      const students = await prisma.student.findMany({
        where: { projectId: parseInt(projectId) },
      });
      if (!students)
        return res.status(404).json("No project found for that department");
      return res.status(200).json(students);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    const { projectId, reg_no } = req.query;
    try {
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: { projectId: null },
      });
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    const { reg_no } = req.query;
    const { projectId } = req.body;
    try {
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: { projectId: parseInt(projectId) },
      });
      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { reg_no } = req.query;
    const { data } = req.body;
    try {
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: {
          name: data.name,
          reg_no: data.reg_no,
          email: data.email,
          contact_no: data.contact_no,
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
