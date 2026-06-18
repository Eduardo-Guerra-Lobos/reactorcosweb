import {
  createRango,
  getRangos,
  deleteAllRangos,
} from '../../services/RangosServices';

// Limpia el localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
});

describe('RangosServices', () => {
  describe('getRangos', () => {
    test('retorna array vacío cuando no hay rangos guardados', () => {
      const result = getRangos();
      expect(result).toEqual([]);
    });

    test('retorna los rangos guardados en localStorage', () => {
      const rangos = [{ nombre: 'Capitán' }];
      localStorage.setItem('rangos_data', JSON.stringify(rangos));

      const result = getRangos();
      expect(result).toEqual(rangos);
    });
  });

  describe('createRango', () => {
    test('guarda un rango en localStorage', () => {
      const rango = { nombre: 'Soldado' };
      createRango(rango);

      const result = getRangos();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(rango);
    });

    test('agrega el rango a la lista existente sin borrar los anteriores', () => {
      const primero = { nombre: 'Soldado' };
      const segundo = { nombre: 'Capitán' };

      createRango(primero);
      createRango(segundo);

      const result = getRangos();
      expect(result).toHaveLength(2);
      expect(result).toContainEqual(primero);
      expect(result).toContainEqual(segundo);
    });

    test('puede guardar un rango con nombre especial', () => {
      const rango = { nombre: 'Gran Señor Oscuro' };
      createRango(rango);

      const result = getRangos();
      expect(result[0].nombre).toBe('Gran Señor Oscuro');
    });
  });

  describe('deleteAllRangos', () => {
    test('elimina todos los rangos de localStorage', () => {
      createRango({ nombre: 'Soldado' });
      createRango({ nombre: 'Capitán' });

      deleteAllRangos();

      const result = getRangos();
      expect(result).toEqual([]);
    });

    test('no lanza error si no había rangos guardados', () => {
      expect(() => deleteAllRangos()).not.toThrow();
    });
  });
});
