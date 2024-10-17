//aqui en el service se maneja la logica de la aplicacion como: crear, actualizar, eliminar y buscar albumes osea METODOS CRUD
//este archivo es luego manejado por el controlador para ser utilizado en las rutas de la aplicacion
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Interprete } from 'src/interpretes/entities/interprete.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('albumes')
@Injectable() // el decorador @Injectable() es necesario para que la clase pueda ser inyectada en otros componentes
export class AlbumesService {
  //se crea la clase AlbumesService que nos permitira manejar la logica de la aplicacion
  constructor(
    @InjectRepository(Album) //se inyecta el repositorio de albumes
    private albumesRepository: Repository<Album>, //se crea una variable privada llamada albumesRepository que contendra el repositorio de albumes
  ) {}

  async create(createAlbumeDto: CreateAlbumDto): Promise<Album> {
    //se crea el metodo create que recibe un objeto de tipo CreateAlbumDto y retorna un objeto de tipo Album
    const existe = await this.albumesRepository.findOneBy({
      //el metodo findOneBy busca un album por su nombre
      nombre: createAlbumeDto.nombre.trim(),
      interprete: { id: createAlbumeDto.idInterprete },
    });
    if (existe) {
      //si el album ya existe se lanza una excepcion
      throw new ConflictException('El album ya existe');
    }
    const album = new Album(); //se crea un objeto de tipo Album
    album.nombre = createAlbumeDto.nombre.trim(); //se asigna el nombre del album
    album.fechaLanzamiento = createAlbumeDto.fechaLanzamiento; //se asigna la fecha de lanzamiento del album
    album.interprete = { id: createAlbumeDto.idInterprete } as Interprete; //se asigna el interprete del album
    return this.albumesRepository.save(album); //se guarda el album en la base de datos
  }

  //se crea el metodo findAll que retorna un arreglo de objetos de tipo Album, esto sirve para buscar todos los albumes
  async findAll(): Promise<Album[]> {
    return this.albumesRepository.find({ relations: ['interprete'] }); //se retorna todos los albumes, relations es para que tambien se muestre el interprete
  }



  /* ESTA MAL EL METODO innerJoin porque no se puede hacer innerJoin con una relación ManyToOne
  async findByInterprete(idInterprete: number): Promise<Album[]> {
    return this.albumesRepository
      .createQueryBuilder('albumes')
      .innerJoin('albumes.interprete', 'interprete')
      .where('interprete.id = :idInterprete', { idInterprete })
      .getMany();
  }
  */
  async findByInterprete(idInterprete: number): Promise<Album[]> {
    return this.albumesRepository
      .createQueryBuilder('albumes')
      .innerJoinAndSelect('albumes.interprete', 'interprete') // Asegura que también selecciones los datos de la relación
      .where('interprete.id = :idInterprete', { idInterprete })
      .getMany();
  }
  
  //se crea el metodo findOne que recibe un id de tipo number y retorna un objeto de tipo Album, esto sirve para buscar un album por su id
  async findOne(id: number): Promise<Album> {
    const album = this.albumesRepository.findOne({
      where: { id },
      relations: ['interprete'],
    });
    if (!album) throw new NotFoundException('El album no existe');
    return album;
  }

  ///se crea el metodo update que recibe un id de tipo number y un objeto de tipo UpdateAlbumDto y
  //retorna un objeto de tipo Album, esto sirve para actualizar un album
  async update(id: number, updateAlbumeDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    album.nombre = updateAlbumeDto.nombre.trim();
    album.fechaLanzamiento = updateAlbumeDto.fechaLanzamiento;
    album.interprete = { id: updateAlbumeDto.idInterprete } as Interprete;
    return this.albumesRepository.save(album);
  }

  //se crea el metodo remove que recibe un id de tipo number y retorna un objeto de tipo Album, esto sirve para eliminar
  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumesRepository.softRemove(album);
  }
}
