import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SendCodeDto } from './dto/send-code.dto.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { UserService } from '../user/user.service.js';
import { AuthorizationResponseDto } from './dto/authorithation-response.dto.js';
import { JwtService } from '@nestjs/jwt';
import { IOtpService, OTP_SERVICE_NAME } from '../otp/otp-service.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(OTP_SERVICE_NAME) private readonly otpService: IOtpService,
  ) {}

  async verifyAndSignIn(signInDto: SignInDto) {
    const { phone, code } = signInDto;
    const user = await this.userService.findByPhone(phone);
    const verify = await this.otpService.verifyCode(phone, code);

    if (!verify) {
      throw new BadRequestException(
        'Invalid verification code or phone number',
      );
    }

    return await this.generateTokens(user.id);
  }

  async sendCode(sendCodeDto: SendCodeDto): Promise<void> {
    const createUserDto = plainToInstance(CreateUserDto, sendCodeDto);
    const user = await this.userService.findOrCreate(createUserDto);

    if (user) {
      await this.otpService.sendCode(user.phone);
    }
  }

  private async generateTokens(
    userId: string,
    refreshToken?: string,
  ): Promise<AuthorizationResponseDto> {
    const payload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    let newRefreshToken: string;
    if (refreshToken) {
      newRefreshToken = refreshToken;
    } else {
      newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });
    }

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
