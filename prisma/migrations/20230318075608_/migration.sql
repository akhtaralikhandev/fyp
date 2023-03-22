-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department"("name") ON DELETE SET NULL ON UPDATE CASCADE;
