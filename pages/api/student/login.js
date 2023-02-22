import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
    if (!student) {
      return res.status(401).json("email not found");
    }
    if (password === student.password) {
      const session = {
        student: { reg_no: student.reg_no, name: student.name },
      };
      return res.status(200).json(student);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export default handler;
