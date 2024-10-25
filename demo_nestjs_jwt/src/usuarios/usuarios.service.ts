import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuariosDto } from './dto/create-usuario.dto';
import { UpdateUsuariosDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariossRepository: Repository<Usuario>,
  ) {}

  async create(createUsuariosDto: CreateUsuariosDto): Promise<Usuario> {
    // Verificar si ya existe un usuarios con el mismo correo electrónico o nombre de usuarios
    //findOne() se modifica para que busque un usuarios por correo electrónico o nombre de usuarios
    const buscandoRepetidos = await this.usuariossRepository.findOne({
      where: [
        { email: createUsuariosDto.email.trim() },
        { usuarios: createUsuariosDto.usuarios.trim() },
      ],
    });
    if (buscandoRepetidos) {
      if (buscandoRepetidos.email === createUsuariosDto.email.trim()) {
        throw new ConflictException('El correo electrónico ya está en uso');
      } else {
        throw new ConflictException('El nombre de usuarios ya existe');
      }
    }
    // Crear un nuevo usuarios
    const usuarios = new Usuario();
    usuarios.usuarios = createUsuariosDto.usuarios.trim();
    usuarios.clave = process.env.DEFAUlt_PASSWORD;
    usuarios.email = createUsuariosDto.email.trim();
    usuarios.rol = createUsuariosDto.rol.trim();
    usuarios.premiun = createUsuariosDto.premiun;

    // Guardar el usuarios en la base de datos
    return this.usuariossRepository.save(usuarios);
  }

  //findAll() se modifica para que retorne una lista de usuarioss
  async findAll(): Promise<Usuario[]> {
    return this.usuariossRepository.find();
  }

  //findOne() se modifica para que retorne un usuarios ejemplo por id, sirve cuando se necesita buscar
  //un usuarios por id y si no existe lanza un mensaje de error
  async findOne(id: number): Promise<Usuario> {
    const usuarios = await this.usuariossRepository.findOneBy({ id });
    if (!usuarios) throw new NotFoundException('El interprete no existe');
    return usuarios;
  }

  async update(
    id: number,
    updateUsuariosDto: UpdateUsuariosDto,
  ): Promise<Usuario> {
    const Usuario = await this.findOne(id);
    const usuariosUpdated = Object.assign(Usuario, updateUsuariosDto); // el object.assign es para copiar atributos que mandaste a actualizar, y los que no mandaste los deja igual ejemplo mandas ci,nombre y digamos no mandaste apellido eso lo mantiene.
    return this.usuariossRepository.save(usuariosUpdated);
  }

  //remove() se modifica para que elimine un usuarios por id, sirve cuando se necesita eliminar un usuarios por id
  async remove(id: number) {
    const usuarios = await this.findOne(id);
    return this.usuariossRepository.remove(usuarios); //eliminar el registro de la base de datos
  }

  async validate(usuarios: string, clave: string): Promise<Usuario> {
    const usuariosOk = await this.usuariossRepository.findOne({
      where: { usuarios },
      select: ['id', 'usuarios', 'clave', 'email', 'rol', 'premiun'],
    });

    if (!usuariosOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuariosOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    delete usuariosOk.clave;
    return usuariosOk;
  }
}
