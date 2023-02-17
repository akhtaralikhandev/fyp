-- CreateTable
CREATE TABLE "Student" (
    "username" TEXT NOT NULL,
    "regNo" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "faculty_name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("regNo")
);

-- CreateTable
CREATE TABLE "Employee" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Faculty" (
    "faculty_name" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("faculty_name")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_contact_key" ON "Student"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_faculty_name_key" ON "Student"("faculty_name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_faculty_name_key" ON "Faculty"("faculty_name");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_coordinator_key" ON "Faculty"("coordinator");

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_id_key" ON "Project"("project_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
