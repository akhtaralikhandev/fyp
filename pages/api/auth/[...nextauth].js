import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

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
        // Add logic here to look up the user from the credentials supplied
        // console.log(credentials);
        const student = await prisma.student.findUnique({
          where: { email: credentials.email },
        });
        const employee = await prisma.employee.findUnique({
          where: { email: credentials.email },
        });
        if (student && student.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return student;
        } else if (employee && employee.password === credentials.password) {
          return employee;
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
    async jwt({ token, student, employee }) {
      // console.log(token);
      return { ...token, ...(employee || student) };
    },
    async session({ session, token, student }) {
      session.user = token;
      console.log(session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
