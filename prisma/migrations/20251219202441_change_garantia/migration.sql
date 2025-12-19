-- DropForeignKey
ALTER TABLE "GarantiaSucursal" DROP CONSTRAINT "GarantiaSucursal_garantiaId_fkey";

-- AlterTable
ALTER TABLE "GarantiaSucursal" ADD COLUMN     "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "GarantiaSucursal" ADD CONSTRAINT "GarantiaSucursal_garantiaId_fkey" FOREIGN KEY ("garantiaId") REFERENCES "Garantia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
