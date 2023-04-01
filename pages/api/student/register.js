import { mailOption, transporter } from "../../../config/nodemailer";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import cors from "cors"; // import cors middleware
const prisma = new PrismaClient();

const corsMiddleware = cors(); // create a new cors middleware instance

const registrationHandler = async (req, res) => {
  // use cors middleware
  await corsMiddleware(req, res);

  if (req.method === "POST") {
    try {
      const { name, department_name, password, email, contact_no, reg_no } =
        req.body;
      const student = await prisma.student.findUnique({
        where: { email: email },
      });
      if (student) return res.status(403).json("Email already taken ");
      const verificationToken = jwt.sign(
        {
          email,
          password,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      ); // replace with your own implementation
      const verificationLink = `${process.env.BASE_URL}/api/student/verify-email?token=${verificationToken}`;
      await transporter.sendMail({
        ...mailOption,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email and complete your registration.</p>`,
      });
      res
        .status(200)
        .json(
          "Registration successful. Please check your email to verify your account."
        );

      await prisma.student.create({
        data: {
          name: name,
          email: email,
          password: password,
          department_name: department_name,
          reg_no: parseInt(reg_no),
          contact_no: contact_no,
          verification_token: verificationToken, // save verification token in database
          isVerified: false, // set is_verified to false
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(400).json({ message: "Bad request" });
  }
};

export default registrationHandler;
