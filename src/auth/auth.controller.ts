import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto.js';
import { SendCodeDto } from './dto/send-code.dto.js';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInDto,
    description: 'Authorization Request',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.verifyAndSignIn(signInDto);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('/send-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SendCodeDto,
    description: 'Authorization Request',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    await this.authService.sendCode(sendCodeDto);
  }
}
