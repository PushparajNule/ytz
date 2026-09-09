/*
  Warnings:

  - Added the required column `videoPublicURL` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "thumbnailPublicURL" TEXT,
ADD COLUMN     "videoPublicURL" TEXT NOT NULL;
