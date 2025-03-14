import { Injectable } from '@nestjs/common';
import { IOtpService } from './otp-service.interface.js';

const MOCK_OTP_CODE = '426785';

@Injectable()
export class MockOtpService implements IOtpService {
  async sendCode(phone: string): Promise<void> {}

  async verifyCode(phone: string, code: string): Promise<boolean> {
    return Promise.resolve(code === MOCK_OTP_CODE);
  }
}
