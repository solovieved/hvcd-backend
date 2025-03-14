import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationResponseDto {
  @ApiProperty({
    example: 'czZCaGRSa3F0MzpnWDFmQmF0M2JW',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    example: '$fdzDSzZCaGRSa3F0MzpnWDFmQmF0M2JW',
    required: true,
  })
  refreshToken: string;
}
