import { IsNotEmpty, IsString } from 'class-validator';

export class SmsConfigCheckAuthDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;
}
