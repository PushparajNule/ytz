/*
  Warnings:

  - Added the required column `title` to the `PlayList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayList" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
