import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuerrerosTable from '../../components/GuerrerosTable';

const guerrerosMock = [
  { nombre: 'Azog', tipo: 'Orco', nivel: 50, rango: { nombre: 'Capitán' } },
  { nombre: 'Bolg', tipo: 'Uruk', nivel: 30, rango: { nombre: 'Soldado' } },
];

describe('GuerrerosTable', () => {
  test('renderiza las columnas de la tabla correctamente', () => {
    render(<GuerrerosTable guerreros={[]} onRemoveGuerrero={() => {}} />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText('Nivel')).toBeInTheDocument();
    expect(screen.getByText('Rango')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  test('renderiza los datos de los guerreros', () => {
    render(
      <GuerrerosTable guerreros={guerrerosMock} onRemoveGuerrero={() => {}} />
    );
    expect(screen.getByText('Azog')).toBeInTheDocument();
    expect(screen.getByText('Bolg')).toBeInTheDocument();
    expect(screen.getByText('Orco')).toBeInTheDocument();
    expect(screen.getByText('Uruk')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Capitán')).toBeInTheDocument();
    expect(screen.getByText('Soldado')).toBeInTheDocument();
  });

  test('renderiza un botón de acción por cada guerrero', () => {
    render(
      <GuerrerosTable guerreros={guerrerosMock} onRemoveGuerrero={() => {}} />
    );
    const botones = screen.getAllByRole('button', { name: /asesinado/i });
    expect(botones).toHaveLength(guerrerosMock.length);
  });

  test('llama a onRemoveGuerrero con el guerrero correcto al hacer clic', () => {
    const mockRemove = jest.fn();
    render(
      <GuerrerosTable guerreros={guerrerosMock} onRemoveGuerrero={mockRemove} />
    );

    const botones = screen.getAllByRole('button', { name: /asesinado/i });
    // Clic sobre el primer guerrero (Azog)
    fireEvent.click(botones[0]);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(guerrerosMock[0]);
  });

  test('no renderiza filas de datos cuando la lista está vacía', () => {
    render(<GuerrerosTable guerreros={[]} onRemoveGuerrero={() => {}} />);
    expect(screen.queryByRole('button', { name: /asesinado/i })).not.toBeInTheDocument();
  });
});
