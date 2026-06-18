import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyState from '../../components/EmptyState';

describe('EmptyState', () => {
  test('renderiza el título por defecto cuando no se pasa prop', () => {
    render(<EmptyState />);
    expect(screen.getByText('No hay datos')).toBeInTheDocument();
  });

  test('renderiza el título personalizado que se le pase', () => {
    render(<EmptyState title="No hay Rangos" />);
    expect(screen.getByText('No hay Rangos')).toBeInTheDocument();
  });

  test('renderiza el contenido cuando se pasa la prop', () => {
    render(
      <EmptyState
        title="Sin datos"
        contenido="Debe registrar rangos para generar guerreros"
      />
    );
    expect(
      screen.getByText('Debe registrar rangos para generar guerreros')
    ).toBeInTheDocument();
  });

  test('no renderiza el párrafo de contenido si no se pasa la prop', () => {
    render(<EmptyState title="Sin datos" />);
    // No debe haber ningún <p> con contenido
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
});
