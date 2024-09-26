/*
  Warnings:

  - You are about to alter the column `email` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "email" SET DATA TYPE VARCHAR(300);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
