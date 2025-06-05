import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import RecipesTable from './Recipes-table';
import { IRecipe } from '@/core/recipe';

// Mock Next/Link component
jest.mock('next/link', () => {
  function Link({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  }
  Link.displayName = 'Link';
  return Link;
});

// Mock the utils functions
jest.mock('./resipes-table-utils', () => ({
  getUniqueIngredients: () => [
    'Eggs',
    'Bacon',
    'Pasta',
    'Lettuce',
    'Parmesan',
  ],
  getUniqueMainIngredients: () => ['Pasta', 'Chicken'],
}));

const mockRecipes: IRecipe[] = [
  {
    recipeID: '1',
    Name: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish',
    mainIngredient: {
      key: 'pasta-main',
      name: 'Pasta',
      quantity: 500,
      unitOfMeasurement: 'g',
    },
    ingredients: [
      {
        key: 'eggs',
        name: 'Eggs',
        quantity: 3,
        unitOfMeasurement: 'pcs',
      },
      {
        key: 'bacon',
        name: 'Bacon',
        quantity: 200,
        unitOfMeasurement: 'g',
      },
    ],
    imgUrl: null,
  },
  {
    recipeID: '2',
    Name: 'Caesar Salad',
    description: 'Fresh salad with chicken',
    mainIngredient: {
      key: 'chicken-main',
      name: 'Chicken',
      quantity: 300,
      unitOfMeasurement: 'g',
    },
    ingredients: [
      {
        key: 'lettuce',
        name: 'Lettuce',
        quantity: 1,
        unitOfMeasurement: 'head',
      },
      {
        key: 'parmesan',
        name: 'Parmesan',
        quantity: 50,
        unitOfMeasurement: 'g',
      },
    ],
    imgUrl: null,
  },
];

describe('RecipesTable', () => {
  const renderComponent = () =>
    render(
      <MantineProvider>
        <RecipesTable recipes={mockRecipes} />
      </MantineProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers', () => {
    renderComponent();
    const headers = [
      'Name',
      'Description',
      'Main Ingredient',
      'Ingredients',
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('filters recipes by name', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      'Filter by name',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pasta' } });
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
    expect(
      screen.queryByText('Caesar Salad'),
    ).not.toBeInTheDocument();
  });

  it('filters recipes by description', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      'Filter by description',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Italian' } });
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
    expect(
      screen.queryByText('Caesar Salad'),
    ).not.toBeInTheDocument();
  });

  it('displays recipe ingredients', () => {
    renderComponent();
    expect(screen.getByText('Pasta:500g')).toBeInTheDocument();
    expect(screen.getByText('Eggs: 3pcs')).toBeInTheDocument();
    expect(screen.getByText('Bacon: 200g')).toBeInTheDocument();
  });
});
