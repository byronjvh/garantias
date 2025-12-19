/*
  Warnings:

  - Added the required column `sucursalActualId` to the `Garantia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Garantia" ADD COLUMN     "sucursalActualId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Garantia" ADD CONSTRAINT "Garantia_sucursalActualId_fkey" FOREIGN KEY ("sucursalActualId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
