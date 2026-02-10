/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Garantia` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Garantia" ADD COLUMN     "resolucion" TEXT,
ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Garantia_token_key" ON "Garantia"("token");
