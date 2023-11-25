import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string
}
