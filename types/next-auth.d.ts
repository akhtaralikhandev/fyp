import NextAuth from "next-auth/next";
import { Employee, Student } from "./interfaces";

declare module "next-auth"{
  interface Session {
    student: Student,
    employee: Employee
  }
}