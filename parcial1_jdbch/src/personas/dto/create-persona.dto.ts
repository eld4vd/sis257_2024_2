import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, MaxLength } from 'class-validator';

export class CreatePersonaDto {

  @IsNotEmpty({ message: 'El campo ci es obligatorio' })
  @IsString({ message: 'El campo ci debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo ci no debe ser mayor a 50 caracteres',
  })
  readonly ci: string;

  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @IsNotEmpty({ message: 'El campo primer apellido es obligatorio' })
  @IsString({ message: 'El campo primer apellido debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo primer apellido no debe ser mayor a 50 caracteres',
  })
  readonly primer_apellido: string;

  @IsNotEmpty({ message: 'El campo segundo apellido es obligatorio' })
  @IsString({ message: 'El campo segundo apellido debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo segundo apellido no debe ser mayor a 50 caracteres',
  })
  readonly segundo_apellido: string;

  @IsNotEmpty({ message: 'El campo fecha de nacimiento es obligatorio' })
  @IsDate({ message: 'El campo fecha de nacimiento debe ser una fecha' })
  @Type(() => Date)
  readonly fecha_nacimiento: Date;
}
