-- CreateTable
CREATE TABLE "posts" (
    "uuid" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "image" VARCHAR(255),
    "author_uuid" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "post_comments" (
    "uuid" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "author_uuid" TEXT NOT NULL,
    "post_uuid" TEXT NOT NULL,

    CONSTRAINT "post_comments_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "post_likes" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "post_uuid" TEXT NOT NULL,

    CONSTRAINT "post_likes_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_uuid_fkey" FOREIGN KEY ("post_uuid") REFERENCES "posts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
