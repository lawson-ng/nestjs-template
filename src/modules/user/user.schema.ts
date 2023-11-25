import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument } from 'mongoose'
import { BaseSchema, DefaultSchema } from 'src/base/entities/base.schema'

export type UserDocument = HydratedDocument<User>

@DefaultSchema()
export class User extends BaseSchema {
  @ApiProperty({
    type: String,
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  password: string

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
  })
  avatar: string

  @ApiProperty({
    type: String,
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  email: string

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
  })
  fullName: string
}

export const UserSchema = SchemaFactory.createForClass(User)
