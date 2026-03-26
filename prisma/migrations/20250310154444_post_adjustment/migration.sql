/*
  Warnings:

  - Made the column `content_en` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_en` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content_en" SET NOT NULL,
ALTER COLUMN "title_en" SET NOT NULL;
