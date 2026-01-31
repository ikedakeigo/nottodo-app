-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "not_todos" ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NONE';

-- CreateIndex
CREATE INDEX "not_todos_user_id_due_date_idx" ON "not_todos"("user_id", "due_date");

-- CreateIndex
CREATE INDEX "not_todos_user_id_priority_idx" ON "not_todos"("user_id", "priority");
