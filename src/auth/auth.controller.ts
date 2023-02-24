import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request, @Body() data: { refreshToken: string }) {
    if (typeof data.refreshToken != 'string')
      throw new UnauthorizedException('Unauthorized');

    const userId = req.user['sub'];

    return this.authService.refreshTokens(userId, data.refreshToken);
  }
}
