import {
  createGuerrero,
  getGuerreros,
  deleteAllGuerreros,
  removeGuerrero,
} from '../../services/GuerrerosServices';

// Limpia el localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('GuerrerosServices', () => {
  describe('getGuerreros', () => {
    test('retorna array vacío cuando no hay guerreros guardados', () => {
      const result = getGuerreros();
      expect(result).toEqual([]);
    });

    test('retorna los guerreros guardados en localStorage', () => {
      const guerreros = [{ nombre: 'Azog', tipo: 'Orco', nivel: 50 }];
      localStorage.setItem('guerreros_list_data', JSON.stringify(guerreros));

      const result = getGuerreros();
      expect(result).toEqual(guerreros);
    });
  });

  describe('createGuerrero', () => {
    test('guarda un guerrero en localStorage', () => {
      const guerrero = { nombre: 'Bolg', tipo: 'Uruk', nivel: 30 };
      createGuerrero(guerrero);

      const result = getGuerreros();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(guerrero);
    });

    test('agrega el guerrero a la lista existente sin borrar los anteriores', () => {
      const primero = { nombre: 'Azog', tipo: 'Orco', nivel: 50 };
      const segundo = { nombre: 'Bolg', tipo: 'Uruk', nivel: 30 };

      createGuerrero(primero);
      createGuerrero(segundo);

      const result = getGuerreros();
      expect(result).toHaveLength(2);
      expect(result).toContainEqual(primero);
      expect(result).toContainEqual(segundo);
    });

    test('puede guardar múltiples guerreros con datos distintos', () => {
      const guerrero = { nombre: 'Gothmog', tipo: 'Orco', nivel: 90, rango: { nombre: 'Capitán' } };
      createGuerrero(guerrero);

      const result = getGuerreros();
      expect(result[0].rango.nombre).toBe('Capitán');
    });
  });

  describe('removeGuerrero', () => {
    test('elimina el guerrero con el nombre indicado', () => {
      const azog = { nombre: 'Azog', tipo: 'Orco', nivel: 50 };
      const bolg = { nombre: 'Bolg', tipo: 'Uruk', nivel: 30 };
      createGuerrero(azog);
      createGuerrero(bolg);

      removeGuerrero(azog);

      const result = getGuerreros();
      expect(result).toHaveLength(1);
      expect(result[0].nombre).toBe('Bolg');
    });

    test('no falla si el guerrero no existe en la lista', () => {
      const azog = { nombre: 'Azog', tipo: 'Orco', nivel: 50 };
      createGuerrero(azog);

      const fantasma = { nombre: 'Nadie', tipo: 'Orco', nivel: 1 };
      removeGuerrero(fantasma);

      const result = getGuerreros();
      expect(result).toHaveLength(1);
    });

    test('deja la lista vacía si se elimina el único guerrero', () => {
      const azog = { nombre: 'Azog', tipo: 'Orco', nivel: 50 };
      createGuerrero(azog);
      removeGuerrero(azog);

      const result = getGuerreros();
      expect(result).toHaveLength(0);
    });
  });

  describe('deleteAllGuerreros', () => {
    test('elimina todos los guerreros de localStorage', () => {
      createGuerrero({ nombre: 'Azog', tipo: 'Orco', nivel: 50 });
      createGuerrero({ nombre: 'Bolg', tipo: 'Uruk', nivel: 30 });

      deleteAllGuerreros();

      const result = getGuerreros();
      expect(result).toEqual([]);
    });
  });
});
