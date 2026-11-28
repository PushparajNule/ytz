/*
  Warnings:

  - You are about to drop the column `watchedAt` on the `WatchHistory` table. All the data in the column will be lost.
  - Added the required column `lastWatched` to the `WatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WatchHistory_userId_watchedAt_idx";

-- AlterTable
ALTER TABLE "WatchHistory" DROP COLUMN "watchedAt",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lastWatched" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "WatchHistory_userId_lastWatched_idx" ON "WatchHistory"("userId", "lastWatched");
