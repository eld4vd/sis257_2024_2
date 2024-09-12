import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si ya existe un usuario con el mismo correo electrónico o nombre de usuario
    //findOne() se modifica para que busque un usuario por correo electrónico o nombre de usuario
    const buscandoRepetidos = await this.usuariosRepository.findOne({
      where: [
        { email: createUsuarioDto.email.trim() },
        { usuario: createUsuarioDto.usuario.trim() },
      ],
    });
    if (buscandoRepetidos) {
      if (buscandoRepetidos.email === createUsuarioDto.email.trim()) {
        throw new ConflictException('El correo electrónico ya está en uso');
      } else {
        throw new ConflictException('El nombre de usuario ya existe');
      }
    }
    // Crear un nuevo usuario
    const usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.clave = createUsuarioDto.clave.trim();
    usuario.email = createUsuarioDto.email.trim();
    usuario.rol = createUsuarioDto.rol.trim();
    usuario.premiun = createUsuarioDto.premiun;

    // Guardar el usuario en la base de datos
    return this.usuariosRepository.save(usuario);
  }

  //findAll() se modifica para que retorne una lista de usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  //findOne() se modifica para que retorne un usuario ejemplo por id, sirve cuando se necesita buscar
  //un usuario por id y si no existe lanza un mensaje de error
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('El interprete no existe');
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const Usuario = await this.findOne(id);
    const usuarioUpdated = Object.assign(Usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuarioUpdated);
  }

  //remove() se modifica para que elimine un usuario por id, sirve cuando se necesita eliminar un usuario por id
  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuariosRepository.remove(usuario); //eliminar el registro de la base de datos
  }
}
