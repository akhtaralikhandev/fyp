export interface Student {
    name?: string | null | undefined
    reg_no: string
    projectId: number
    password?: string
    accessToken?: string
    role: string
    email?:string
}
export interface Employee {
    name?: string | null | undefined
    email?:string
    role: string
    departement_name: string;
    password?: string;
    accessToken?: string
}
// model Student {
//   reg_no           Int         @unique
//   name             String
//   email            String      @unique
//   password         String
//   contact_no       String      @unique
//   departement_name String?
//   departement      Department? @relation(fields: [departement_name], references: [name])
//   projectId        Int?
//   project          Project?    @relation(fields: [projectId], references: [id])
// }