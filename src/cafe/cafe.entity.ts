import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TiendaEntity } from 'src/tienda/tienda.entity';

@Entity()
export class CafeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
   
    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
   
    @Column()
    precio: number;

    @ManyToMany(() =>TiendaEntity, tienda => tienda.cafes)
    @JoinTable()
    tiendas: TiendaEntity[]

   }
