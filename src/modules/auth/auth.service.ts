import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { UserEntity } from '../user/entities/user.entity'
import { User, UserDocument } from '../user/user.schema'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { BaseService } from 'src/base/service/base.service'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class AuthService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super(userModel)
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getOne({ email })
    if (!user) {
      throw new UnauthorizedException()
    }

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException()
    }

    return {
      ...new UserEntity(user),
      accessToken: (await this.signToken(user)).accessToken,
    }
  }

  async signToken(user: any) {
    const payload = {
      _id: user._id,
      email: user.email,
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    })

    return { accessToken }
  }

  async createUser(body: CreateUserDto) {
    const { email, password } = body
    let user = await this.getOne({ email })
    if (user) {
      throw new BadRequestException('Email has been registered')
    }
    const hashedPassword = bcrypt.hashSync(password, 12)
    user = await this.createOne<CreateUserDto>({
      email,
      password: hashedPassword,
    })
    return this.signToken(user)
  }
}
