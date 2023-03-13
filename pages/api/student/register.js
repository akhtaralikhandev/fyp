import { mailOption, transporter } from "../../../config/nodemailer";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const registrationHandler = async (req, res) => {
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

// import { PrismaClient, Prisma } from "@prisma/client";
// const prisma = new PrismaClient();
// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const { name, department_name, password, email, contact_no, reg_no } =
//         req.body;
//       const student = await prisma.student.create({
//         data: {
//           name: name,
//           email: email,
//           password: password,
//           department_name: department_name,
//           reg_no: parseInt(reg_no),
//           contact_no: contact_no,
//         },
//       });
//       console.log(student);
//       res.status(200).json(student);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error.message);
//     }
//   } else if (req.method === "PUT") {
//     try {
//       const { email, data } = req.body;
//       const student = await prisma.student.update({
//         where: { email: email },
//         data: { ...data },
//       });
//       if (!student) return res.status(404).json("No student found");
//       res.status(200).json(student);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       const { email } = req.body;
//       const student = await prisma.student.delete({
//         where: {
//           email: email,
//         },
//       });
//       res.status(200).json("Student deleted");
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };

// export default handler;
