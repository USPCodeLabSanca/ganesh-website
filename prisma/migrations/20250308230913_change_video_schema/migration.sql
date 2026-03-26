/*
  Warnings:

  - Made the column `description` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_en` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_en` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description_en" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "title_en" SET NOT NULL;
