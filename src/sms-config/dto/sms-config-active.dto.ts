import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SmsConfignActivateDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsBoolean()
    isActive: boolean;
}
