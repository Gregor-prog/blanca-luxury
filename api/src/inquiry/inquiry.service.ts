import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto, UpdateInquiryDto, InquiryQueryDto } from './dto/inquiry.dto';

const INQUIRY_SELECT = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  message: true,
  serviceInterest: true,
  source: true,
  status: true,
  createdAt: true,
  showroom: { select: { id: true, name: true, city: true } },
  product: { select: { id: true, name: true, slug: true } },
  assignedAdmin: { select: { id: true, email: true } },
} as const;

@Injectable()
export class InquiryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInquiryDto) {
    return this.prisma.inquiry.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        serviceInterest: dto.serviceInterest,
        source: dto.source ?? 'WEBSITE',
        ...(dto.showroomId ? { showroomId: dto.showroomId } : {}),
        ...(dto.productId  ? { productId:  dto.productId  } : {}),
      },
      select: INQUIRY_SELECT,
    });
  }

  async findAll(query: InquiryQueryDto = {}) {
    const page  = Math.max(1, Number(query.page)  || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip  = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (query.status)     where.status     = query.status;
    if (query.showroomId) where.showroomId = query.showroomId;
    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search } },
        { email:    { contains: query.search } },
        { phone:    { contains: query.search } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: INQUIRY_SELECT,
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      select: INQUIRY_SELECT,
    });
    if (!inquiry) throw new NotFoundException(`Inquiry ${id} not found`);
    return inquiry;
  }

  async update(id: string, dto: UpdateInquiryDto) {
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: dto,
      select: INQUIRY_SELECT,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.inquiry.delete({ where: { id } });
  }
}
