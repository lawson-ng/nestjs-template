import { Exclude, Expose, plainToClass } from 'class-transformer'

export class UserEntity {
  @Expose()
  email: string

  @Expose()
  avatar: string

  @Expose()
  fullName: string

  @Exclude()
  password: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(
      this,
      plainToClass(UserEntity, partial, { excludeExtraneousValues: true }),
    )
  }
}
