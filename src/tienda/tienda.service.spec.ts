import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from 'shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendasList: TiendaEntity[];
 
  beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TiendaService],
   }).compile();
 
   service = module.get<TiendaService>(TiendaService);
   repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
  await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  tiendasList = [];
  for(let i = 0; i < 5; i++){
      const tienda: TiendaEntity = await repository.save({
        nombre: faker.lorem.sentence(),
        descripcion: faker.lorem.sentence(),
        precio: Math.floor(Math.random() * 100),
      })
      tiendasList.push(tienda);
  }
}

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createTienda should return a new tienda', async () => {
    const tienda: TiendaEntity = {
      id: Math.floor(Math.random() * 100),
      nombre: faker.lorem.sentence(),
      direccion: faker.lorem.sentence(),
      telefono: faker.lorem.sentence(),
      cafes: []
    }

    const newTienda: TiendaEntity = await service.createTienda(tienda);
  expect(newTienda).not.toBeNull();

  const storedTienda: TiendaEntity = await repository.findOne({where: {id: newTienda.id}})
  expect(tienda).not.toBeNull();
  expect(tienda.nombre).toEqual(storedTienda.nombre)
  expect(tienda.direccion).toEqual(storedTienda.direccion)
  expect(tienda.telefono).toEqual(storedTienda.telefono)

});
});