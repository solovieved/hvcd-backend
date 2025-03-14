import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';
import { OtpModule } from '../otp/otp.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard.js';
import { readFileSync } from 'node:fs';
import path from 'node:path';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    UserModule,
    OtpModule,
    JwtModule.register({
      global: true,
      publicKey: readFileSync(path.resolve('./secrets/public-key.pem'), 'utf8'),
      privateKey: readFileSync(
        path.resolve('./secrets/private-key.pem'),
        'utf8',
      ),
      signOptions: { expiresIn: '1d', algorithm: 'ES256' },
    }),
  ],
})
export class AuthModule {}
