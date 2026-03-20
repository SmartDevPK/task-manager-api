import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Serve static frontend files from "public" folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), 
    }),

    //  Database connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task_manager',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),

    // Your backend modules
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  providers: [AppService],
})
export class AppModule {}
