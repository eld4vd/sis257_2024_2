// en el archivo module sirve para importar los controladores y servicios de la aplicacion
// por ejemplo en este caso se importa el controlador AlbumesController y el servicio AlbumesService
// y estos se exportan al archivo principal como el app.module.ts 
import { Module } from '@nestjs/common';
import { AlbumesService } from './albumes.service';
import { AlbumesController } from './albumes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],//se importa el modulo TypeOrmModule y se le pasa un arreglo con la entidad Album
  controllers: [AlbumesController],
  providers: [AlbumesService],
})
export class AlbumesModule {}
