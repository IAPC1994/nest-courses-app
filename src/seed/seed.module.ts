import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  imports: [AuthModule, UsersModule],
  providers: [SeedService],
})
export class SeedModule {}
