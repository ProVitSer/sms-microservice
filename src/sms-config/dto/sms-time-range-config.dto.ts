import { IsNotEmpty, IsString } from 'class-validator';

export class SmsTimeRangesConfignDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsString()
    @IsNotEmpty()
    start: string;

    @IsString()
    @IsNotEmpty()
    end: string;

    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    smsText: string;
}
