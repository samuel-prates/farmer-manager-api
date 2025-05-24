import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from './farm.entity';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  federalIdentification: string;

  @Column()
  farmerName: string;

  @OneToMany(() => Farm, (farm) => farm.farmer, { cascade: true })
  farms: Farm[];
}