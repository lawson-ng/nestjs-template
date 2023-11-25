import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { getMongoUrl } from './config/environment'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard'

@Module({
  imports: [
    // Config file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Config mongoose
    MongooseModule.forRoot(getMongoUrl(), {
      // autoIndex: true,
      autoCreate: true,
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),

    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
