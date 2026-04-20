import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentAdmin } from './decorators/current-admin.decorator';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@CurrentAdmin() admin: { id: string; email: string; role: string }) {
    return this.authService.login(admin.id, admin.email, admin.role);
  }

  // POST /auth/refresh  — send refresh token as Bearer
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @CurrentAdmin() admin: { sub: string; email: string; role: string },
  ) {
    return this.authService.refreshTokens(admin.sub, admin.email, admin.role);
  }

  // GET /auth/me  — requires valid access token
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentAdmin() admin: { id: string }) {
    return this.authService.getMe(admin.id);
  }

  // POST /auth/logout  — client just discards the tokens; nothing to do server-side
  // (extend here if you add a token blacklist with Redis)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return { message: 'Logged out successfully' };
  }
}
