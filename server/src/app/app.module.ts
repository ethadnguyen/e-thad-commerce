import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from 'src/config/config.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../core/guards/role.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/users/users.module';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  imports: [
    ConfigsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    PaginationService,
  ],
  exports: [PaginationService],
})
export class AppModule {}
