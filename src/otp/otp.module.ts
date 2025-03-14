import { Module } from '@nestjs/common';
import { MockOtpService } from './mock-otp.service.js';
import { OTP_SERVICE_NAME } from './otp-service.interface.js';

@Module({
  providers: [{ provide: OTP_SERVICE_NAME, useClass: MockOtpService }],
  exports: [OTP_SERVICE_NAME],
})
export class OtpModule {}
