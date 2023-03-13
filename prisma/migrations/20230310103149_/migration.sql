-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'Recommend_further_work', 'APPROVED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('EVALUATOR', 'ADVISOR', 'CO_ADVISOR');

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinator_email" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "department_name" TEXT
);

-- CreateTable
CREATE TABLE "Employee_Department" (
    "employee_email" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "Employee_Department_pkey" PRIMARY KEY ("department_name","employee_email")
);

-- CreateTable
CREATE TABLE "Student" (
    "reg_no" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "projectId" INTEGER,
    "verification_token" TEXT,
    "isVerified" BOOLEAN
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING',
    "department_name" TEXT NOT NULL,
    "attributes" BOOLEAN NOT NULL DEFAULT false,
    "SDG" BOOLEAN NOT NULL DEFAULT false,
    "supervisor_accepted" BOOLEAN NOT NULL DEFAULT false,
    "coSupervisor_accepted" BOOLEAN NOT NULL DEFAULT false,
    "admin_student_email" TEXT,
    "panel_id" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProjectJoiningRequest" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "student_reg_no" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "Employee_Project" (
    "project_id" INTEGER NOT NULL,
    "employee_email" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,

    CONSTRAINT "Employee_Project_pkey" PRIMARY KEY ("project_id","employee_email")
);

-- CreateTable
CREATE TABLE "Project_Supervisor_Request" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "supervisor_email" TEXT,
    "cosupervisor_email" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Project_Supervisor_Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Panel" (
    "id" SERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "Rubrics" (
    "id" SERIAL NOT NULL,
    "statement" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "presentation_SceduleId" INTEGER,
    "evaluator" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Presentation_Scedule" (
    "id" SERIAL NOT NULL,
    "Presentation_number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "Start_time" TIMESTAMP(3) NOT NULL,
    "End_time" TIMESTAMP(3) NOT NULL,
    "panelId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_password_key" ON "SuperAdmin"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_coordinator_email_key" ON "Department"("coordinator_email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contact_no_key" ON "Employee"("contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "Student_reg_no_key" ON "Student"("reg_no");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_contact_no_key" ON "Student"("contact_no");

-- CreateIndex
CREATE UNIQUE INDEX "Student_verification_token_key" ON "Student"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "Project_panel_id_key" ON "Project"("panel_id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProjectJoiningRequest_id_key" ON "StudentProjectJoiningRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProjectJoiningRequest_student_reg_no_key" ON "StudentProjectJoiningRequest"("student_reg_no");

-- CreateIndex
CREATE UNIQUE INDEX "Panel_id_key" ON "Panel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rubrics_id_key" ON "Rubrics"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_Scedule_id_key" ON "Presentation_Scedule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_Scedule_panelId_key" ON "Presentation_Scedule"("panelId");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_coordinator_email_fkey" FOREIGN KEY ("coordinator_email") REFERENCES "Employee"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Department" ADD CONSTRAINT "Employee_Department_employee_email_fkey" FOREIGN KEY ("employee_email") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Department" ADD CONSTRAINT "Employee_Department_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_admin_student_email_fkey" FOREIGN KEY ("admin_student_email") REFERENCES "Student"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_panel_id_fkey" FOREIGN KEY ("panel_id") REFERENCES "Panel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProjectJoiningRequest" ADD CONSTRAINT "StudentProjectJoiningRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProjectJoiningRequest" ADD CONSTRAINT "StudentProjectJoiningRequest_student_reg_no_fkey" FOREIGN KEY ("student_reg_no") REFERENCES "Student"("reg_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Project" ADD CONSTRAINT "Employee_Project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Project" ADD CONSTRAINT "Employee_Project_employee_email_fkey" FOREIGN KEY ("employee_email") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Supervisor_Request" ADD CONSTRAINT "Project_Supervisor_Request_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_presentation_SceduleId_fkey" FOREIGN KEY ("presentation_SceduleId") REFERENCES "Presentation_Scedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrics" ADD CONSTRAINT "Rubrics_evaluator_fkey" FOREIGN KEY ("evaluator") REFERENCES "Employee"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presentation_Scedule" ADD CONSTRAINT "Presentation_Scedule_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "Panel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
