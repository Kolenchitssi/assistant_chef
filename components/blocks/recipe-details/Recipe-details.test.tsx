import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeDetails from './Recipe-details';
import { getDataByIdFromFirebase } from '@/utils/getDataFromFirebase/getDataFromFirebase';

// Мок функции getDataByIdFromFirebase
jest.mock('@/utils/getDataFromFirebase/getDataFromFirebase', () => ({
  getDataByIdFromFirebase: jest.fn(),
}));

describe('RecipeDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Симулируем загрузку данных
    (getDataByIdFromFirebase as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<RecipeDetails recipeID="1" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when data fetching fails', async () => {
    // Симулируем ошибку при загрузке данных
    (getDataByIdFromFirebase as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch'),
    );

    render(<RecipeDetails recipeID="1" />);

    // Используем findByText для ожидания появления сообщения об ошибке
    // Вместо waitFor мы используем findByText, который является асинхронным и сам по себе ожидает появления элемента в DOM.
    // Это упрощает код и делает его более читаемым.
    expect(
      await screen.findByText('Error: Failed to fetch'),
    ).toBeInTheDocument();
  });

  it('renders "Recipe not found" when recipe is null', async () => {
    // Симулируем успешную загрузку данных, но рецепт не найден
    (getDataByIdFromFirebase as jest.Mock).mockResolvedValue(null);

    render(<RecipeDetails recipeID="1" />);

    // Ожидаем появления сообщения "Recipe not found"
    await waitFor(() => {
      expect(
        screen.getByText('Recipe not found'),
      ).toBeInTheDocument();
    });
  });
});
