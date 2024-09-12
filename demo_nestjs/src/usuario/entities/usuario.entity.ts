import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  usuario: string;

  @Column('varchar', { length: 50 })
  clave: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  rol: string;

  @Column('boolean')
  premiun: boolean;
}
