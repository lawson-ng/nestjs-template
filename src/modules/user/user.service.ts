import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseService } from 'src/base/service/base.service'
import { User, UserDocument } from './user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel)
  }
}
