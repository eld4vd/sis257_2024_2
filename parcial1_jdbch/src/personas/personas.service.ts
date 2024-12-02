import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const existe = await this.personasRepository.findOneBy({
      ci: createPersonaDto.ci.trim(),
      nombre: createPersonaDto.nombre.trim(),
      primer_apellido: createPersonaDto.primer_apellido.trim(),
      segundo_apellido: createPersonaDto.segundo_apellido.trim(),
      fecha_nacimiento: createPersonaDto.fecha_nacimiento,
    });

    if (existe) throw new ConflictException('La persona ya existe');

    const persona = new Persona();
    persona.ci = createPersonaDto.ci.trim();
    persona.nombre = createPersonaDto.nombre.trim();
    persona.primer_apellido = createPersonaDto.primer_apellido.trim();
    persona.segundo_apellido = createPersonaDto.segundo_apellido.trim();
    persona.fecha_nacimiento = createPersonaDto.fecha_nacimiento;

    return this.personasRepository.save(persona);
  }

  async findAll(): Promise<Persona[]> {
    return this.personasRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personasRepository.findOneBy({ id });
    if (!persona) throw new NotFoundException('La persona no existe');
    return persona;
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.findOne(id);
    const personaUpdate = Object.assign(persona, updatePersonaDto);
    return this.personasRepository.save(personaUpdate);
  }

  async remove(id: number)  {
    const persona = await this.findOne(id);
    return this.personasRepository.remove(persona);
  }
}
