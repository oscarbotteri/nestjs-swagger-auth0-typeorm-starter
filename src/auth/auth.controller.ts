import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggedUser } from './decorators/logged-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
  @Get('/auth/me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@LoggedUser() user) {
    return user;
  }
}
