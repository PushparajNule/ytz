-- CreateTable
CREATE TABLE "Dislikes" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dislikes_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE INDEX "Dislikes_userId_createdAt_idx" ON "Dislikes"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Dislikes_postId_createdAt_idx" ON "Dislikes"("postId", "createdAt");

-- AddForeignKey
ALTER TABLE "Dislikes" ADD CONSTRAINT "Dislikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislikes" ADD CONSTRAINT "Dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
