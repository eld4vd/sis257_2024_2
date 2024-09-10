import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateInterpreteDto {
  // Se crea el DTO para la creación de un interprete es decir los datos que se van a recibir
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(30, { message: 'El campo debe tener un máximo de 30 caracteres' })
  readonly nacionalidad: string; // Se agrega nacionalidad al DTO (readonly es para que no se pueda modificar)
}
