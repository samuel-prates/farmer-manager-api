import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Farmer } from './farmer.entity';
import { Harvest } from './harvest.entity';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  farmName: string;

  @Column()
  totalArea: number;

  @Column()
  arableArea: number;

  @Column()
  vegetationArea: number;

  @ManyToOne(() => Farmer, (farmer) => farmer.farms, { onDelete: 'CASCADE' })
  farmer: Farmer;

  @OneToMany(() => Harvest, (harvest) => harvest.farm, { cascade: true })
  harvests: Harvest[];
}