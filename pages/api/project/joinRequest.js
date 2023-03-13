import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { reg_no, projectId } = req.body;
    try {
      const project = await prisma.studentRequest.create({
        data: {
          student_reg_no: parseInt(reg_no),
          projectId: parseInt(projectId),
        },
      });
      console.log(project);
      return res
        .status(200)
        .json({ message: "Request sent successfuly ", project });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const { projectId } = req.query;
    try {
      const studentRequest = await prisma.studentRequest.findMany({
        where: { projectId: parseInt(projectId) },
        include: {
          student: true,
        },
      });
      return res.status(200).json(studentRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { projectId, reg_no } = req.query;
    try {
      const studentRequest = await prisma.studentRequest.update({
        where: { student_reg_no: parseInt(reg_no) },
        data: { status: "ACCEPTED" },
      });
      const student = await prisma.student.update({
        where: { reg_no: parseInt(reg_no) },
        data: { projectId: parseInt(projectId) },
      });
      await prisma.studentRequest.delete({
        where: { student_reg_no: parseInt(reg_no) },
      });
      return res.status(200).json(student);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error);
    }
  }
};

export default handler;
