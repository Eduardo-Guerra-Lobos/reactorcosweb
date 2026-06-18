import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RangosView from '../../components/RangosView';

const rangosMock = [
  { nombre: 'Capitán' },
  { nombre: 'Soldado' },
  { nombre: 'General' },
];

describe('RangosView', () => {
  test('renderiza el encabezado "Rangos existentes"', () => {
    render(<RangosView rangos={[]} />);
    expect(screen.getByText('Rangos existentes')).toBeInTheDocument();
  });

  test('renderiza los nombres de los rangos en la lista', () => {
    render(<RangosView rangos={rangosMock} />);
    expect(screen.getByText('Capitán')).toBeInTheDocument();
    expect(screen.getByText('Soldado')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  test('no muestra nombres cuando la lista está vacía', () => {
    render(<RangosView rangos={[]} />);
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  test('renderiza cada rango como elemento de encabezado h1', () => {
    render(<RangosView rangos={rangosMock} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(rangosMock.length);
  });
});
