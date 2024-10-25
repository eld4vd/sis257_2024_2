//En el archivo controller se define la lógica de las peticiones HTTP, en este caso se define el controlador de albumes
//osea se define la logica de las peticiones HTTP si es un GET, POST, PUT, DELETE
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AlbumesService } from './albumes.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('albumes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('albumes')
export class AlbumesController {
  constructor(private readonly albumesService: AlbumesService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumesService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumesService.findAll();
  }

  @Get('interprete/:idInterprete')
  findByInterprete(@Param('idInterprete') idInterprete: string) {
    return this.albumesService.findByInterprete(+idInterprete);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumesService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumesService.remove(+id);
  }
}
