import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'task_manager',
  autoLoadEntities: true,
  synchronize: true
}),
  AuthModule,
  UsersModule,
  TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
