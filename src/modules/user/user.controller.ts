import { Controller, Get, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('user')
export class UserController {
  @Get('me')
  async getProfile(@Request() req) {
    return req.user
  }
}
