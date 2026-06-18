import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuerreroForm from '../../components/GuerreroForm';

const rangosMock = [
  { nombre: 'Capitán' },
  { nombre: 'Soldado' },
];

describe('GuerreroForm', () => {
  test('renderiza el encabezado del panel', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByText('Ingresar Guerrero')).toBeInTheDocument();
  });

  test('renderiza el campo de nombre', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  test('renderiza el selector de tipo de guerrero', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByText('Tipo de Guerrero')).toBeInTheDocument();
    expect(screen.getByText('Orco')).toBeInTheDocument();
    expect(screen.getByText('Uruk')).toBeInTheDocument();
  });

  test('renderiza el control de nivel', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByText('Nivel')).toBeInTheDocument();
  });

  test('renderiza el selector de rango', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByText('Rango')).toBeInTheDocument();
  });

  test('renderiza el botón Registrar', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  test('el campo de nombre empieza vacío', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    const input = screen.getByLabelText('Nombre');
    expect(input.value).toBe('');
  });

  test('actualiza el valor del campo nombre al escribir', () => {
    render(<GuerreroForm rangos={rangosMock} />);
    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Gothmog' } });
    expect(input.value).toBe('Gothmog');
  });

  test('llama a onCreateGuerrero al hacer clic en Registrar', () => {
    const mockCreate = jest.fn();
    render(<GuerreroForm rangos={rangosMock} onCreateGuerrero={mockCreate} />);

    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Gothmog' } });

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  test('el guerrero creado tiene el nombre ingresado', () => {
    const mockCreate = jest.fn();
    render(<GuerreroForm rangos={rangosMock} onCreateGuerrero={mockCreate} />);

    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Azog' } });
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    const guerreroCreado = mockCreate.mock.calls[0][0];
    expect(guerreroCreado.nombre).toBe('Azog');
  });

  test('el guerrero creado tiene tipo "Orco" por defecto', () => {
    const mockCreate = jest.fn();
    render(<GuerreroForm rangos={rangosMock} onCreateGuerrero={mockCreate} />);

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    const guerreroCreado = mockCreate.mock.calls[0][0];
    expect(guerreroCreado.tipo).toBe('Orco');
  });

  test('el guerrero creado tiene nivel 1 por defecto', () => {
    const mockCreate = jest.fn();
    render(<GuerreroForm rangos={rangosMock} onCreateGuerrero={mockCreate} />);

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    const guerreroCreado = mockCreate.mock.calls[0][0];
    expect(guerreroCreado.nivel).toBe(1);
  });

  test('se puede renderizar sin rangos sin lanzar error', () => {
    expect(() => render(<GuerreroForm rangos={[]} />)).not.toThrow();
  });
});
