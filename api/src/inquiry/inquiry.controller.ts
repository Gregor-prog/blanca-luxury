import {
  Body, Controller, Delete, Get, Param,
  ParseUUIDPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CreateInquiryDto, InquiryQueryDto, UpdateInquiryDto } from './dto/inquiry.dto';
import { InquiryService } from './inquiry.service';

@Controller('inquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  // Public: anyone can submit an enquiry from the website
  @Public()
  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiryService.create(dto);
  }

  // Admins: both roles can view inquiries
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Get()
  findAll(@Query() query: InquiryQueryDto) {
    return this.inquiryService.findAll(query);
  }

  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inquiryService.findOne(id);
  }

  @Roles(AdminRole.SUPER_ADMIN, AdminRole.SHOWROOM_MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateInquiryDto,
  ) {
    return this.inquiryService.update(id, dto);
  }

  @Roles(AdminRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inquiryService.remove(id);
  }
}
