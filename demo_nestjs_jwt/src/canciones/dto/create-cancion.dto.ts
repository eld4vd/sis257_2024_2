import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCancionDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idAlbum es obligatorio' })
  @IsNumber({}, { message: 'El campo idAlbum debe ser un número' })
  readonly idAlbum: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idGenero es obligatorio' })
  @IsNumber({}, { message: 'El campo idGenero debe ser un número' })
  readonly idGenero: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser un string o cadena' })
  @MaxLength(40, {
    message: 'El campo nombre debe tener un máximo de 40 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion es obligatorio' })
  @IsString({ message: 'El campo duracion debe ser un string o cadena' })
  @MaxLength(8, {
    message: 'El campo duracion debe tener un máximo de 8 caracteres',
  })
  readonly duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tags es obligatorio' })
  @IsString({ message: 'El campo tags debe ser un string o cadena' })
  @MaxLength(30, {
    message: 'El campo tags debe tener un máximo de 30 caracteres',
  })
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo url es obligatorio' })
  @IsString({ message: 'El campo url debe ser un string o cadena' })
  @MaxLength(250, {
    message: 'El campo url debe tener un máximo de 250 caracteres',
  })
  readonly url: string;
}
