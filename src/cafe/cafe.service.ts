import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CafeEntity } from './cafe.entity';

@Injectable()
export class CafeService {

    constructor(
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
    ){}
    
      async createCafe(cafe: CafeEntity): Promise<CafeEntity> {
        const cafeRetorno: CafeEntity = await this.cafeRepository.save(cafe);
        if (cafe.precio>=0)
          throw new BusinessLogicException("El cafe tiene que tener un precio mayor a 0", BusinessError.NOT_FOUND);

        return cafeRetorno

    }

}
