import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from 'shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { faker } from '@faker-js/faker';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafesList: CafeEntity[];
 
  beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [CafeService],
   }).compile();
 
   service = module.get<CafeService>(CafeService);
   repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
  await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  cafesList = [];
  for(let i = 0; i < 5; i++){
      const cafe: CafeEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        precio: Math.floor(Math.random() * 100),
      })
      cafesList.push(cafe);
  }
}

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createCafe should return a new cafe', async () => {
    const cafe: CafeEntity = {
      id: Math.floor(Math.random() * 100),
      nombre: faker.lorem.sentence(),
      descripcion: faker.lorem.sentence(),
      precio: Math.floor(Math.random() * 100),
      tiendas: []
    }

    const newCafe: CafeEntity = await service.createCafe(cafe);
  expect(newCafe).not.toBeNull();

  const storedCafe: CafeEntity = await repository.findOne({where: {id: newCafe.id}})
  expect(cafe).not.toBeNull();
  expect(cafe.nombre).toEqual(storedCafe.nombre)
  expect(cafe.descripcion).toEqual(storedCafe.descripcion)
  expect(cafe.precio).toEqual(storedCafe.precio)

});
});
