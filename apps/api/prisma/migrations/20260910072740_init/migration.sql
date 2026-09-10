/*
  Warnings:

  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `owner` on the `PlayList` table. All the data in the column will be lost.
  - The primary key for the `WatchList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WatchList` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PlayList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `WatchList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WatchList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_owner_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_owner_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_subscriberId_fkey";

-- DropForeignKey
ALTER TABLE "WatchList" DROP CONSTRAINT "WatchList_owner_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId", "postId");

-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "owner",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WatchList" DROP CONSTRAINT "WatchList_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "owner",
DROP COLUMN "updatedAt",
ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "WatchList_pkey" PRIMARY KEY ("userId", "postId");

-- CreateTable
CREATE TABLE "PlayListItem" (
    "playlistId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayListItem_pkey" PRIMARY KEY ("playlistId","postId")
);

-- CreateTable
CREATE TABLE "WatchHistory" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE INDEX "PlayListItem_playlistId_addedAt_idx" ON "PlayListItem"("playlistId", "addedAt");

-- CreateIndex
CREATE INDEX "WatchHistory_userId_watchedAt_idx" ON "WatchHistory"("userId", "watchedAt");

-- CreateIndex
CREATE INDEX "Likes_userId_createdAt_idx" ON "Likes"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Likes_postId_createdAt_idx" ON "Likes"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "PlayList_userId_createdAt_idx" ON "PlayList"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Subscription_subscriberId_createdAt_idx" ON "Subscription"("subscriberId", "createdAt");

-- CreateIndex
CREATE INDEX "Subscription_channelId_createdAt_idx" ON "Subscription"("channelId", "createdAt");

-- CreateIndex
CREATE INDEX "WatchList_userId_addedAt_idx" ON "WatchList"("userId", "addedAt");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayListItem" ADD CONSTRAINT "PlayListItem_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayListItem" ADD CONSTRAINT "PlayListItem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
