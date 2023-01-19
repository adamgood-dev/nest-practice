import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsEmail
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;
}