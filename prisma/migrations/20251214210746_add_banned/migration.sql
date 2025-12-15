/*
  Warnings:

  - You are about to drop the column `banned` on the `Sucursal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sucursal" DROP COLUMN "banned";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false;
