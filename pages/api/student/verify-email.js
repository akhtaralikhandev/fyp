import { mailOption, transporter } from "../../../config/nodemailer";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const verifyEmailHandler = async (req, res) => {
  if (req.method === "GET") {
    const { token } = req.query;
    if (!token) {
      res.status(400).json("Invalid verification token.");
      return;
    }
    try {
      const student = await prisma.student.findUnique({
        where: {
          verification_token: token,
        },
      });

      if (!student) {
        res.status(200).send(`
  <p> You may now <a href="${process.env.BASE_URL}">login</a>.</p>
`);
        return;
      }
      // update student record to mark as verified
      await prisma.student.update({
        where: {
          email: student.email,
        },
        data: {
          isVerified: true,
          verification_token: null,
        },
      });

      res;
      res.status(200).send(`
  <p>Email verification successful. You may now <a href="${process.env.BASE_URL}/login">login</a>.</p>
`);
    } catch (error) {
      console.log(error);
      console.log("erroredoccred");
      res.status(500).json(error.message);
    }
  } else {
    return res.status(400).json({ message: "Bad request" });
  }
};
export default verifyEmailHandler;
