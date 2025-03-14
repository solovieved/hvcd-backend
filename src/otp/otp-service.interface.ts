export const OTP_SERVICE_NAME = 'OtpService';

export interface IOtpService {
  sendCode(phone: string): Promise<void>;
  verifyCode(phone: string, otp: string): Promise<boolean>;
}
