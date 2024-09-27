// En el archivo DTO es donde se definen los objetos que se reciben en las peticiones HTTP,
//en este caso se define el objeto CreateAlbumDto que pronto se usará en el controlador de albumes

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de lanzamiento debe ser definido' })
  @IsDateString(
    {},
    { message: 'El campo fecha de lanzamiento debe ser una fecha' },
  )
  readonly fechaLanzamiento: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo idInterprete debe estar definido' }) // Se agrega validación para el id del interprete
  @IsNumber(
    {},
    { message: 'El campo idInterprete debe ser tipo numerico' }, // Se agrega mensaje de validación para el id del interprete
  )
  readonly idInterprete: number;
}
