import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RangoForm from '../../components/RangoForm';

describe('RangoForm', () => {
  test('renderiza el panel con el encabezado correcto', () => {
    render(<RangoForm />);
    expect(screen.getByText('Registrar Rango')).toBeInTheDocument();
  });

  test('renderiza el campo de texto "Nombre"', () => {
    render(<RangoForm />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  test('renderiza el botón "Registrar"', () => {
    render(<RangoForm />);
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  test('el campo de nombre empieza vacío', () => {
    render(<RangoForm />);
    const input = screen.getByLabelText('Nombre');
    expect(input.value).toBe('');
  });

  test('actualiza el valor del campo al escribir', () => {
    render(<RangoForm />);
    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Capitán' } });
    expect(input.value).toBe('Capitán');
  });

  test('llama a onCreateRango con el nombre correcto al hacer clic en Registrar', () => {
    const mockOnCreate = jest.fn();
    render(<RangoForm onCreateRango={mockOnCreate} />);

    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Soldado' } });

    const boton = screen.getByRole('button', { name: /registrar/i });
    fireEvent.click(boton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    expect(mockOnCreate).toHaveBeenCalledWith({ nombre: 'Soldado' });
  });

  test('llama a onCreateRango con nombre vacío si no se escribe nada', () => {
    const mockOnCreate = jest.fn();
    render(<RangoForm onCreateRango={mockOnCreate} />);

    const boton = screen.getByRole('button', { name: /registrar/i });
    fireEvent.click(boton);

    expect(mockOnCreate).toHaveBeenCalledWith({ nombre: '' });
  });

  test('muestra la descripción de ayuda del campo', () => {
    render(<RangoForm />);
    expect(
      screen.getByText(/Ingrese descripcion \(nombre\) del rango/i)
    ).toBeInTheDocument();
  });
});
