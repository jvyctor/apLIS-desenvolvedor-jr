/*
  Warnings:

  - You are about to drop the `medico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `medico`;

-- DropTable
DROP TABLE `paciente`;

-- CreateTable
CREATE TABLE `medicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `CRM` VARCHAR(191) NOT NULL,
    `UFCRM` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `medicos_CRM_key`(`CRM`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NULL,
    `carteirinha` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pacientes_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
