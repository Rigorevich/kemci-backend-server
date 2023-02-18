-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Success" AS ENUM ('SUCCESS', 'BAN');

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "subcategory_id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("subcategory_id")
);

-- CreateTable
CREATE TABLE "models" (
    "model_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "author_id" INTEGER,
    "subcategory_id" INTEGER NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "profile_id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "surname" VARCHAR(256) NOT NULL,
    "patronymic" VARCHAR(256),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "hash_password" VARCHAR(256) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "success" "Success" NOT NULL DEFAULT 'SUCCESS',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_category_id_key" ON "subcategories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("subcategory_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
