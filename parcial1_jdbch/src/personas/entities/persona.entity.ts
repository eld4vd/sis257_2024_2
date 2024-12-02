import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  ci: string;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50 })
  primer_apellido: string;

  @Column('varchar', { length: 50 })
  segundo_apellido: string;

  @Column('date')
  fecha_nacimiento: Date;

}
