import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Env } from './utils/env/env.config';
import { PackageModule } from './modules/module.package';

@Module({
  imports: [
    PackageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [() => Env],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
