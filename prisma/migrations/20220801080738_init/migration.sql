/*
  Warnings:

  - You are about to drop the `thoughts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thoughtId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_contributorId_fkey`;

-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_thoughtId_fkey`;

-- DropForeignKey
ALTER TABLE `thoughts` DROP FOREIGN KEY `Thoughts_userId_fkey`;

-- DropTable
DROP TABLE `thoughts`;

-- CreateTable
CREATE TABLE `Thought` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isPublic` BOOLEAN NULL DEFAULT true,
    `thought` VARCHAR(4096) NOT NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `dislikes` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnConversations` (
    `conversationId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`conversationId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_thoughtId_key` ON `Conversation`(`thoughtId`);

-- AddForeignKey
ALTER TABLE `Thought` ADD CONSTRAINT `Thought_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_thoughtId_fkey` FOREIGN KEY (`thoughtId`) REFERENCES `Thought`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnConversations` ADD CONSTRAINT `UsersOnConversations_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnConversations` ADD CONSTRAINT `UsersOnConversations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
