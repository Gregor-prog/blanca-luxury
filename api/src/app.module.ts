import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { ShowroomModule } from './showroom/showroom.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductModule } from './product/product.module';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    // Config — loads .env globally, no need to import ConfigModule elsewhere
    ConfigModule.forRoot({ isGlobal: true }),

    // In-memory cache — 5 min TTL, globally available
    CacheModule.register({ isGlobal: true, ttl: 5 * 60 * 1000 }),

    // Core
    PrismaModule,

    // Feature modules
    AuthModule,
    AdminModule,
    RolesModule,
    CloudinaryModule,
    ShowroomModule,
    ProductModule,
    ProjectModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Global DTO validation (class-validator)
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,       // strip unknown properties
        forbidNonWhitelisted: true,
        transform: true,       // auto-cast primitives from query/params
        transformOptions: { enableImplicitConversion: true },
      }),
    },

    // Global JWT guard — every route requires auth unless decorated @Public()
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
