// En los archivos entity se define la estructura de la tabla en la base de datos, en este caso la tabla albumes

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//se importa la entidad Interprete, esto es para poder relacionar la entidad Album con la entidad Interprete
import { Interprete } from 'src/interpretes/entities/interprete.entity';
import { Cancion } from 'src/canciones/entities/cancion.entity';

@Entity('albumes')
export class Album {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer',{ name: 'id_interprete' })
  idInterprete: number;

  @Column('varchar', { length: 70 })
  nombre: string;

  @Column('date', { name: 'fecha_lanzamiento' })
  fechaLanzamiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  // para la relación con la tabla interpretes, la relación es de muchos a uno
  @ManyToOne(() => Interprete, (interprete) => interprete.albumes)
  @JoinColumn({ name: 'id_interprete', referencedColumnName: 'id' })
  interprete: Interprete;

  @OneToMany(() => Cancion, (cancion) => cancion.album)
  canciones: Cancion[];
}
