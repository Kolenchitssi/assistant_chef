import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipesTable from './Recipes-table';
import { IRecipe } from '@/core/recipe';

// Mock Next/Link component
jest.mock('next/link', () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

// Mock Mantine components
jest.mock('@mantine/core', () => ({
  Table: {
    ScrollContainer: ({
      children,
    }: {
      children: React.ReactNode;
    }) => <div>{children}</div>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Select: ({ onChange, value, placeholder }: any) => (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
      placeholder={placeholder}
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TextInput: ({ onChange, value, placeholder }: any) => (
    <input
      type="text"
      onChange={(e) => onChange(e)}
      value={value}
      placeholder={placeholder}
    />
  ),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MultiSelect: ({ onChange, value, placeholder }: any) => (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value?.split(','))}
      value={value?.join(',')}
      placeholder={placeholder}
    />
  ),
  // Add these as functions instead of object properties
  Thead: function Thead({ children }: { children: React.ReactNode }) {
    return <thead>{children}</thead>;
  },
  Tbody: function Tbody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
  },
  Th: function Th({ children }: { children: React.ReactNode }) {
    return <th>{children}</th>;
  },
  Tr: function Tr({ children }: { children: React.ReactNode }) {
    return <tr>{children}</tr>;
  },
  Td: function Td({ children }: { children: React.ReactNode }) {
    return <td>{children}</td>;
  },
}));

const mockRecipes = [
  {
    recipeID: 'recipeID',
    Name: 'Name',
    description: 'description',
    ingredients: [
      {
        key: 'key',
        name: 'name',
        quantity: 1,
        unitOfMeasurement: 'g',
      },
    ],
    mainIngredient: {
      key: 'key',
      name: 'name',
      quantity: 1,
      unitOfMeasurement: 'g',
    },
    imgUrl: 'imgUrl',
  },
] as IRecipe[];

// describe- for grouping tests
describe('RecipesTable', () => {
  const setup = () => {
    return render(<RecipesTable recipes={mockRecipes} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Recipe table render', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Ingredients')).toBeInTheDocument();
    });
  });
});
