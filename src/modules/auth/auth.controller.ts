import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { Public } from 'src/decorators'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user
  }

  @Public()
  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const response = await this.authService.createUser(body)
      return response
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
