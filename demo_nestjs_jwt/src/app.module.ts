import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InterpretesModule } from './interpretes/interpretes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GenerosModule } from './generos/generos.module';
import { AlbumesModule } from './albumes/albumes.module';
import { CancionesModule } from './canciones/canciones.module';
import { AuthModule } from './auth/auth.module';

// el module principal de la aplicación, en el cual se importan los módulos necesarios para el
//funcionamiento de la aplicación por ejemplo el módulo de configuración, el módulo de TypeORM y el módulo de los intérpretes
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities{.ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    InterpretesModule,
    UsuariosModule,
    GenerosModule,
    AlbumesModule,
    CancionesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //se exporta la clase AppModule para que pueda ser utilizada en otros archivos
