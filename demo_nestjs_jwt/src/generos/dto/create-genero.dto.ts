import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción es obligaroio' })
  @IsString({ message: 'La descripción debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'La descripción debe tener como máximo 150 caracteres',
  })
  readonly descripcion: string;
}
