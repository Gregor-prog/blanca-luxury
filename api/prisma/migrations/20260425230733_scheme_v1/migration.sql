-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'SHOWROOM_MANAGER') NOT NULL DEFAULT 'SHOWROOM_MANAGER',
    `showroom_id` VARCHAR(36) NULL,
    `last_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admins_email_key`(`email`),
    INDEX `admins_showroom_id_idx`(`showroom_id`),
    INDEX `admins_role_idx`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `showrooms` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `phone_numbers` JSON NULL,
    `geotag_metadata` TEXT NULL,
    `email` VARCHAR(191) NULL,
    `whatsapp_number` VARCHAR(191) NULL,
    `instagram_handle` VARCHAR(191) NULL,
    `cover_image_url` VARCHAR(500) NULL,
    `cover_cloudinary_id` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_by` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `showrooms_city_idx`(`city`),
    INDEX `showrooms_is_active_idx`(`is_active`),
    INDEX `showrooms_created_by_idx`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `showroom_images` (
    `id` VARCHAR(191) NOT NULL,
    `showroom_id` VARCHAR(36) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `cloudinaryId` VARCHAR(191) NULL,
    `caption` VARCHAR(191) NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `showroom_images_showroom_id_display_order_idx`(`showroom_id`, `display_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `icon` VARCHAR(191) NULL,
    `image_url` VARCHAR(500) NULL,
    `image_cloudinary_id` VARCHAR(191) NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `categories_slug_key`(`slug`),
    INDEX `categories_is_active_display_order_idx`(`is_active`, `display_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `style` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `origin` ENUM('ITALY', 'TURKEY', 'LOCAL', 'OTHER') NOT NULL DEFAULT 'OTHER',
    `materials` TEXT NULL,
    `dimensions` VARCHAR(191) NULL,
    `lead_time` VARCHAR(191) NULL,
    `price` DECIMAL(12, 2) NULL,
    `price_on_request` BOOLEAN NOT NULL DEFAULT false,
    `category_id` VARCHAR(36) NULL,
    `showroom_id` VARCHAR(36) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `meta_title` VARCHAR(191) NULL,
    `meta_description` VARCHAR(500) NULL,
    `created_by` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `products_slug_key`(`slug`),
    INDEX `products_is_active_is_featured_idx`(`is_active`, `is_featured`),
    INDEX `products_is_active_category_id_idx`(`is_active`, `category_id`),
    INDEX `products_is_active_showroom_id_idx`(`is_active`, `showroom_id`),
    INDEX `products_category_id_showroom_id_is_active_idx`(`category_id`, `showroom_id`, `is_active`),
    INDEX `products_origin_idx`(`origin`),
    INDEX `products_created_at_idx`(`created_at` DESC),
    INDEX `products_created_by_idx`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_media` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(36) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `cloudinaryId` VARCHAR(191) NULL,
    `media_type` ENUM('IMAGE', 'VIDEO') NOT NULL DEFAULT 'IMAGE',
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `alt_text` VARCHAR(191) NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,

    INDEX `product_media_product_id_is_primary_idx`(`product_id`, `is_primary`),
    INDEX `product_media_product_id_display_order_idx`(`product_id`, `display_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    UNIQUE INDEX `tags_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_tags` (
    `product_id` VARCHAR(36) NOT NULL,
    `tag_id` VARCHAR(36) NOT NULL,

    INDEX `product_tags_tag_id_idx`(`tag_id`),
    PRIMARY KEY (`product_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `badge_text` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `showroom_id` VARCHAR(36) NULL,
    `cover_image_url` VARCHAR(500) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `display_order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `collections_slug_key`(`slug`),
    INDEX `collections_is_active_is_featured_idx`(`is_active`, `is_featured`),
    INDEX `collections_is_active_showroom_id_idx`(`is_active`, `showroom_id`),
    INDEX `collections_is_active_display_order_idx`(`is_active`, `display_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection_products` (
    `collection_id` VARCHAR(36) NOT NULL,
    `product_id` VARCHAR(36) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `collection_products_collection_id_display_order_idx`(`collection_id`, `display_order`),
    INDEX `collection_products_product_id_idx`(`product_id`),
    PRIMARY KEY (`collection_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `sector` ENUM('RESIDENTIAL', 'COMMERCIAL', 'HOSPITALITY', 'MEDICAL', 'GOVERNMENT') NOT NULL DEFAULT 'RESIDENTIAL',
    `location` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `client_name` VARCHAR(191) NULL,
    `cover_image_url` VARCHAR(500) NULL,
    `cover_cloudinary_id` VARCHAR(191) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_by` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_is_active_is_featured_idx`(`is_active`, `is_featured`),
    INDEX `projects_is_active_sector_idx`(`is_active`, `sector`),
    INDEX `projects_is_active_year_idx`(`is_active`, `year` DESC),
    INDEX `projects_created_at_idx`(`created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_media` (
    `id` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(36) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `cloudinaryId` VARCHAR(191) NULL,
    `media_type` ENUM('IMAGE', 'VIDEO') NOT NULL DEFAULT 'IMAGE',
    `caption` VARCHAR(191) NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `project_media_project_id_display_order_idx`(`project_id`, `display_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `id` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `service_interest` ENUM('FURNITURE', 'DECOR', 'INTERIOR_DESIGN', 'DRAPERY', 'CONSULTATION') NULL,
    `showroom_id` VARCHAR(36) NULL,
    `product_id` VARCHAR(36) NULL,
    `source` ENUM('WEBSITE', 'WHATSAPP', 'INSTAGRAM', 'REFERRAL', 'WALK_IN') NOT NULL DEFAULT 'WEBSITE',
    `status` ENUM('NEW', 'IN_PROGRESS', 'QUOTED', 'CONVERTED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `assigned_to` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `inquiries_status_created_at_idx`(`status`, `created_at` DESC),
    INDEX `inquiries_showroom_id_status_idx`(`showroom_id`, `status`),
    INDEX `inquiries_assigned_to_status_idx`(`assigned_to`, `status`),
    INDEX `inquiries_product_id_idx`(`product_id`),
    INDEX `inquiries_created_at_idx`(`created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lookbook_images` (
    `id` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `showroom_id` VARCHAR(36) NULL,
    `product_id` VARCHAR(36) NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `lookbook_images_is_active_showroom_id_display_order_idx`(`is_active`, `showroom_id`, `display_order`),
    INDEX `lookbook_images_is_active_display_order_idx`(`is_active`, `display_order`),
    INDEX `lookbook_images_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `cover_image_url` VARCHAR(500) NULL,
    `category` VARCHAR(191) NULL,
    `author_id` VARCHAR(36) NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `published_at` DATETIME(3) NULL,

    UNIQUE INDEX `posts_slug_key`(`slug`),
    INDEX `posts_is_published_published_at_idx`(`is_published`, `published_at` DESC),
    INDEX `posts_is_published_category_idx`(`is_published`, `category`),
    INDEX `posts_author_id_idx`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` VARCHAR(191) NOT NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `client_title` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `project_id` VARCHAR(36) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `testimonials_is_active_rating_idx`(`is_active`, `rating` DESC),
    INDEX `testimonials_project_id_is_active_idx`(`project_id`, `is_active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(36) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` VARCHAR(36) NULL,
    `changes` JSON NULL,
    `ip_address` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_admin_id_created_at_idx`(`admin_id`, `created_at` DESC),
    INDEX `audit_logs_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
    INDEX `audit_logs_created_at_idx`(`created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whatsapp_templates` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `message_template` TEXT NOT NULL,
    `context` ENUM('INQUIRY_REPLY', 'QUOTE_FOLLOW_UP', 'CONSULTATION_BOOKED', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `whatsapp_templates_name_key`(`name`),
    INDEX `whatsapp_templates_is_active_context_idx`(`is_active`, `context`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `showrooms` ADD CONSTRAINT `showrooms_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `showroom_images` ADD CONSTRAINT `showroom_images_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_media` ADD CONSTRAINT `product_media_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tags` ADD CONSTRAINT `product_tags_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tags` ADD CONSTRAINT `product_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_products` ADD CONSTRAINT `collection_products_collection_id_fkey` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_products` ADD CONSTRAINT `collection_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_media` ADD CONSTRAINT `project_media_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lookbook_images` ADD CONSTRAINT `lookbook_images_showroom_id_fkey` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lookbook_images` ADD CONSTRAINT `lookbook_images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
