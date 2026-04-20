import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentAdmin } from '../auth/decorators/current-admin.decorator';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { AdminRole } from '../../generated/prisma/enums';
import { AdminService } from './admin.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // POST /admins  — SUPER_ADMIN only
  @Post()
  @Roles(AdminRole.SUPER_ADMIN)
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  // GET /admins  — SUPER_ADMIN only
  @Get()
  @Roles(AdminRole.SUPER_ADMIN)
  findAll() {
    return this.adminService.findAll();
  }

  // GET /admins/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.findOne(id);
  }

  // PATCH /admins/:id  — SUPER_ADMIN only
  @Patch(':id')
  @Roles(AdminRole.SUPER_ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, dto);
  }

  // PATCH /admins/:id/password  — any authenticated admin (own account)
  @Patch(':id/password')
  changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ChangePasswordDto,
    @CurrentAdmin() me: { id: string; role: string },
  ) {
    // Showroom managers can only change their own password
    if (me.role !== AdminRole.SUPER_ADMIN && me.id !== id) {
      return { message: 'You can only change your own password' };
    }
    return this.adminService.changePassword(id, dto);
  }

  // DELETE /admins/:id  — SUPER_ADMIN only
  @Delete(':id')
  @Roles(AdminRole.SUPER_ADMIN)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentAdmin() me: { id: string },
  ) {
    return this.adminService.remove(id, me.id);
  }
}
