import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { setCookie } from "nookies"; // Import nookies to set cookies
console.log(setCookie);
const prisma = new PrismaClient();
const state = false;
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        setCookie(null, "user_info", "this is the cookie", {
          maxAge: 30 * 24 * 60 * 60, // Expiry time in seconds
          path: "/", // Path of the cookie
        });
        // Add logic here to look up the user from the credentials supplied
        // console.log(credentials);
        const student = await prisma.student.findUnique({
          where: { email: credentials.email },
        });
        const employee = await prisma.employee.findUnique({
          where: { email: credentials.email },
          include: {
            Coordinator: true,
          },
        });
        const superAdmin = await prisma.superAdmin.findUnique({
          where: { email: credentials.email },
        });
        if (student && student.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return { ...student, role: "student" };
        } else if (employee && employee.password === credentials.password) {
          const department = await prisma.department.findFirst({
            where: { coordinator_email: employee.email },
          });
          console.log(department);
          if (department !== null) {
            return {
              ...employee,
              coordinator_depart: department?.name,
              role: "COORDINATOR",
            };
          } else {
            return { ...employee, role: "employee" };
          }
        } else if (superAdmin && superAdmin.password === credentials.password) {
          return { ...superAdmin, role: "superAdmin" };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("user called");
      console.log(token);
      if (user && user.reg_no) {
        return {
          ...token,
          reg_no: user.reg_no,
          projectId: user.projectId,
          department_name: user.department_name,
        };
      } else if (user && user.role) {
        return {
          ...token,
          role: user.role,
          department_name: user.department_name,
          coordinator_depart: user?.Coordinator?.name,
        };
      }
      // console.log("employeed called");
      // console.log(token);
      return token;
    },
    async session({ session, token }) {
      setCookie(null, "user_info", JSON.stringify(token), {
        maxAge: 30 * 24 * 60 * 60, // Expiry time in seconds
        path: "/", // Path of the cookie
      });

      console.log("token called");
      console.log(token);
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
