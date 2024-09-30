import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancion } from './entities/cancion.entity';

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Cancion)
    private cancionesRepository: Repository<Cancion>,
  ) {}

  async create(createCancionDto: CreateCancionDto): Promise<Cancion> {
    const existe = await this.cancionesRepository.findOneBy({
      nombre: createCancionDto.nombre.trim(),
      idAlbum: createCancionDto.idAlbum,
    });

    if (existe) {
      throw new ConflictException('La cancion ya existe');
    }

    const cancion = new Cancion();
    cancion.idAlbum = createCancionDto.idAlbum;
    cancion.idGenero = createCancionDto.idGenero;
    cancion.nombre = createCancionDto.nombre.trim();
    cancion.duracion = createCancionDto.duracion.trim();
    cancion.tags = createCancionDto.tags.trim();
    cancion.url = createCancionDto.url.trim();
    return this.cancionesRepository.save(cancion);
  }

  async findAll(): Promise<Cancion[]> {
    return this.cancionesRepository.find({
      relations: ['album', 'album.interprete', 'genero'],
    });
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOne({
      where: { id },
      relations: ['album', 'album.interprete', 'genero'],
    });
    if (!cancion) throw new NotFoundException('La cancion no existe');
    return cancion;
  }

  async update(
    id: number,
    updateCancionDto: UpdateCancionDto,
  ): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) throw new NotFoundException('La cancion no existe');

    const cancionUpdated = Object.assign(cancion, updateCancionDto);
    return this.cancionesRepository.save(cancionUpdated);
  }

  async remove(id: number) {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) throw new NotFoundException('La cancion no existe');
    return this.cancionesRepository.softRemove(cancion);
  }
}
