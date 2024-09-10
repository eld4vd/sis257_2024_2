import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInterpreteDto } from './dto/create-interprete.dto';
import { UpdateInterpreteDto } from './dto/update-interprete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interprete } from './entities/interprete.entity';

@Injectable()
export class InterpretesService {
  constructor(
    @InjectRepository(Interprete)
    private interpretesRepository: Repository<Interprete>,
  ) {}

  async create(createInterpreteDto: CreateInterpreteDto): Promise<Interprete> {
    const exist = await this.interpretesRepository.findOneBy({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });

    if (exist) throw new ConflictException('El interprete ya existe');
    const interprete = new Interprete();
    interprete.nombre = createInterpreteDto.nombre.trim();
    interprete.nacionalidad = createInterpreteDto.nacionalidad.trim();
    return this.interpretesRepository.save(interprete);
  }

  // Se modifica el método findAll para que retorne una lista de interpretes
  async findAll(): Promise<Interprete[]> {
    return this.interpretesRepository.find();
  }

  async findOne(id: number): Promise<Interprete> {
    const interprete = await this.interpretesRepository.findOneBy({ id });
    if (!interprete) throw new NotFoundException('El interprete no existe');
    return interprete;
  }

  async update(
    id: number,
    updateInterpreteDto: UpdateInterpreteDto,
  ): Promise<Interprete> {
    const Interprete = await this.findOne(id);
    const interpreteUpdated = Object.assign(Interprete, updateInterpreteDto);
    return this.interpretesRepository.save(interpreteUpdated);
  }

  async remove(id: number) {
    const interprete = await this.findOne(id);
    return this.interpretesRepository.softRemove(interprete); //softRemove para no eliminar el registro de la base de datos
  }
}
