-- CreateEnum
CREATE TYPE "EstadoGarantia" AS ENUM ('INGRESADA', 'EN_REVISION_SUCURSAL', 'ESCALADA_A_CEDI', 'EN_REVISION_CEDI', 'ENVIADA_PROVEEDOR', 'EN_REPARACION', 'LISTA_PARA_RETIRO', 'DENEGADA', 'CERRADA');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'ASESOR', 'TECNICO', 'TECNICO_2', 'TI');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sucursalId" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "prefijo" TEXT NOT NULL,
    "direccion" TEXT,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioSucursal" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "UsuarioSucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garantia" (
    "id" SERIAL NOT NULL,
    "consecutivo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estadoActual" "EstadoGarantia" NOT NULL,
    "factura" TEXT,
    "contacto" JSONB NOT NULL,
    "producto" JSONB NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "sucursalNombre" TEXT NOT NULL,
    "sucursalPrefijo" TEXT NOT NULL,
    "cuentaDuenaId" INTEGER NOT NULL,
    "ingresadoPorId" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Garantia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialGarantia" (
    "id" SERIAL NOT NULL,
    "garantiaId" INTEGER NOT NULL,
    "estado" "EstadoGarantia" NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "usuarioRol" "Rol" NOT NULL,
    "usuarioNombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistorialGarantia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_clerkId_key" ON "Usuario"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sucursal_nombre_key" ON "Sucursal"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Sucursal_prefijo_key" ON "Sucursal"("prefijo");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioSucursal_usuarioId_sucursalId_key" ON "UsuarioSucursal"("usuarioId", "sucursalId");

-- CreateIndex
CREATE UNIQUE INDEX "Garantia_consecutivo_key" ON "Garantia"("consecutivo");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioSucursal" ADD CONSTRAINT "UsuarioSucursal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioSucursal" ADD CONSTRAINT "UsuarioSucursal_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garantia" ADD CONSTRAINT "Garantia_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialGarantia" ADD CONSTRAINT "HistorialGarantia_garantiaId_fkey" FOREIGN KEY ("garantiaId") REFERENCES "Garantia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
