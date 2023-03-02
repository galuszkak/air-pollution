import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirPolutionServiceService } from './air-polution-service/air-polution-service.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SchoolMeasurments } from './air-polution-service/models/measurment.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
        })
      ],
      useFactory: (configService: ConfigService) => {

        let options: TypeOrmModuleOptions = {
          type: 'postgres',
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [SchoolMeasurments],
          synchronize: true,
        }
        if (configService.get('INSTANCE_UNIX_SOCKET')) {
          options = Object.assign(options, {
            extra: {
              socketPath: configService.get('INSTANCE_UNIX_SOCKET')
            }
          })
        } else {
          options = Object.assign(options, {
            host: configService.get('DB_HOST'),
            port: +configService.get('POSTGRES_PORT')
          })
        }
        console.log("OPTIONS: ", options)
        return options
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([SchoolMeasurments]),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, AirPolutionServiceService],
  exports: [TypeOrmModule]
})
export class AppModule { }
