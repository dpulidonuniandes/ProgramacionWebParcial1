import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from '../cafe/cafe.entity';
import { TiendaEntity } from '../tienda/tienda.entity';
import { CafeTiendaService } from './cafe-tienda.service';

@Module({
  providers: [CafeTiendaService],
  imports: [TypeOrmModule.forFeature([CafeEntity, TiendaEntity])],
})
export class CafeTiendaModule {}
