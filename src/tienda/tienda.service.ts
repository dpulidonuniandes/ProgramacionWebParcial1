import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';

@Injectable()
export class TiendaService {

    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
      ){}
    
      async createTienda(tienda: TiendaEntity): Promise<TiendaEntity> {
        const tiendaRetorno: TiendaEntity = await this.tiendaRepository.save(tienda);
        if (tienda.telefono.length!=10)
          throw new BusinessLogicException("El cafe tiene que tener un precio mayor a 0", BusinessError.NOT_FOUND);

        return tiendaRetorno

    }

}
