/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_clerkId_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "clerkId",
ADD COLUMN     "authId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_authId_key" ON "Usuario"("authId");
