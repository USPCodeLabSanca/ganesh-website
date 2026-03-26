/*
  Warnings:

  - You are about to drop the column `icon` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Video` table. All the data in the column will be lost.
  - Added the required column `link` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "icon",
DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "summary",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
