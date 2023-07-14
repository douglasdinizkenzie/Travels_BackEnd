-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "phone" VARCHAR(120),
    "date_of_birth" VARCHAR(12) NOT NULL,
    "description" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "address" (
    "uuid" TEXT NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "state" VARCHAR(4) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "address_user_uuid_key" ON "address"("user_uuid");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
