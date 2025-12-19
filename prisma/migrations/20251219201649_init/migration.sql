/*
  Warnings:

  - The values [ENVIADA_PROVEEDOR,DENEGADA,CERRADA] on the enum `EstadoGarantia` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sucursalId` on the `Garantia` table. All the data in the column will be lost.
  - You are about to drop the column `sucursalNombre` on the `Garantia` table. All the data in the column will be lost.
  - You are about to drop the column `sucursalPrefijo` on the `Garantia` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoGarantia_new" AS ENUM ('INGRESADA', 'EN_REVISION_SUCURSAL', 'ESCALADA_A_CEDI', 'EN_REVISION_CEDI', 'ENVIADA_A_PROVEEDOR', 'ESPERANDO_REPUESTO', 'EN_REPARACION', 'DEVUELTA_A_SUCURSAL', 'LISTA_PARA_RETIRO', 'RECHAZADA', 'RESUELTA');
ALTER TABLE "Garantia" ALTER COLUMN "estadoActual" TYPE "EstadoGarantia_new" USING ("estadoActual"::text::"EstadoGarantia_new");
ALTER TABLE "HistorialGarantia" ALTER COLUMN "estado" TYPE "EstadoGarantia_new" USING ("estado"::text::"EstadoGarantia_new");
ALTER TYPE "EstadoGarantia" RENAME TO "EstadoGarantia_old";
ALTER TYPE "EstadoGarantia_new" RENAME TO "EstadoGarantia";
DROP TYPE "public"."EstadoGarantia_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Garantia" DROP CONSTRAINT "Garantia_sucursalId_fkey";

-- AlterTable
ALTER TABLE "Garantia" DROP COLUMN "sucursalId",
DROP COLUMN "sucursalNombre",
DROP COLUMN "sucursalPrefijo";

-- AlterTable
ALTER TABLE "HistorialGarantia" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "GarantiaSucursal" (
    "id" SERIAL NOT NULL,
    "garantiaId" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,

    CONSTRAINT "GarantiaSucursal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GarantiaSucursal_garantiaId_sucursalId_key" ON "GarantiaSucursal"("garantiaId", "sucursalId");

-- AddForeignKey
ALTER TABLE "GarantiaSucursal" ADD CONSTRAINT "GarantiaSucursal_garantiaId_fkey" FOREIGN KEY ("garantiaId") REFERENCES "Garantia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarantiaSucursal" ADD CONSTRAINT "GarantiaSucursal_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
