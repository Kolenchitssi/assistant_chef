import { render, screen } from '@testing-library/react';
import { RecipeKeys } from '@/core/recipe';

import RecipeDetailsCard from './recipe-card';

// Мок данных рецепта
const mockRecipe = {
  [RecipeKeys.recipeName]: 'Test Recipe',
  [RecipeKeys.recipeDescription]: 'Test Description',
  [RecipeKeys.imgUrl]: 'http://example.com/image.jpg',
  [RecipeKeys.mainIngredient]: {
    key: '1',
    name: 'Main Ingredient',
    quantity: 100,
    unitOfMeasurement: 'g',
  },
  ingredients: [
    {
      key: '2',
      name: 'Ingredient 1',
      quantity: 50,
      unitOfMeasurement: 'g',
    },
    {
      key: '3',
      name: 'Ingredient 2',
      quantity: 30,
      unitOfMeasurement: 'ml',
    },
  ],
};

describe('RecipeCard', () => {
  test('Render Recipe Details Card', () => {
    render(<RecipeDetailsCard recipe={mockRecipe} />);

    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/100g/)).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 1/)).toBeInTheDocument();
    expect(screen.getByText(/50g/)).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 2/)).toBeInTheDocument();
    expect(screen.getByText(/30ml/)).toBeInTheDocument();

    expect(
      screen.getAllByText(/Main Ingredient/).length,
    ).toBeGreaterThan(0);
  });
});
