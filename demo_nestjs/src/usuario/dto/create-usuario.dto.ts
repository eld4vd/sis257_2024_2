import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly clave: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El campo debe ser un email' })
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString({ message: 'El campo debe ser un string o cadena' })
  @MaxLength(50, { message: 'El campo debe tener un máximo de 50 caracteres' })
  readonly rol: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsBoolean({ message: 'El campo debe ser un booleano' })
  readonly premiun: boolean;
}
