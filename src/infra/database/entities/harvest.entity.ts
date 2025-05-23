import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Farm } from './farm.entity';

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  culture: string;

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  farm: Farm;
}