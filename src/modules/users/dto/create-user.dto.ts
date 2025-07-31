import { IsNotEmpty, IsEmail, IsString, IsDateString, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsDateString()
    appointmentDate?: string;
}