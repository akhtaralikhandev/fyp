import NextAuth from "next-auth/next";
import {Student, Employee} from './interfaces'
declare module "next-auth"{
  interface Session {
    student: Student,
    employee: Employee
  }
}