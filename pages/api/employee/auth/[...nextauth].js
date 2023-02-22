import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        const student = await prisma.student.findUnique({
          where: { email: credentials.email },
        });
        const employee = await prisma.employee.findUnique({
          where: { email: credentials.email },
        });
        if (student && student.password === credentials.password) {
          return { ...student, role: "student" };
        } else if (employee && employee.password === credentials.password) {
          return { ...employee, role: "employee" };
        } else {
          return null;
        }
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        encode: async ({ secret, token, maxAge }) => {
          const encodedToken = jwt.sign(token, secret, { algorithm: "HS256" });
          const expires = new Date();
          expires.setSeconds(expires.getSeconds() + maxAge);
          return {
            token: encodedToken,
            expires: expires.getTime(),
          };
        },
        decode: async ({ secret, token }) => {
          return jwt.verify(token, secret);
        },
      },
      callbacks: {
        async jwt({ token, account }) {
          return { ...token, ...(account || {}) };
        },
        async session({ session, token }) {
          session.user = token;
          return session;
        },
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
    async session({ session, token }) {
      console.log(session);
      session.user = token.user;
      if (token.redirect) {
        session.redirect = token.redirect;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
