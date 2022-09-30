import { Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { CafeEntity } from 'src/cafe/cafe.entity';

@Entity()
export class TiendaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
   
    @Column()
    nombre: string;
    
    @Column()
    direccion: string;
   
    @Column()
    telefono: string;

    @ManyToMany(() =>CafeEntity, cafe => cafe.tiendas)
    cafes: CafeEntity[]

   }
