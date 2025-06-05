import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IRecipe } from '@/core/recipe';
import RecipesTable from './Recipes-table';

// Мок next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Мок компоненты @mantine/core
jest.mock('@mantine/core', () => {
  const ScrollContainer = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>;
  const Thead = ({ children }: { children: React.ReactNode }) => (
    <thead>{children}</thead>
  );
  const Tbody = ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  );
  const Th = ({ children }: { children: React.ReactNode }) => (
    <th>{children}</th>
  );
  const Tr = ({ children }: { children: React.ReactNode }) => (
    <tr>{children}</tr>
  );
  const Td = ({ children }: { children: React.ReactNode }) => (
    <td>{children}</td>
  );

  const Table = ({
    children,
    striped,
    highlightOnHover,
  }: {
    children: React.ReactNode;
    striped?: boolean;
    highlightOnHover?: boolean;
  }) => (
    <table
      data-striped={striped}
      data-highlight-on-hover={highlightOnHover}
    >
      {children}
    </table>
  );

  Table.ScrollContainer = ScrollContainer;
  Table.Thead = Thead;
  Table.Tbody = Tbody;
  Table.Th = Th;
  Table.Tr = Tr;
  Table.Td = Td;

  const TextInput = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  const Select = ({
    value,
    onChange,
    placeholder,
    data,
  }: {
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder: string;
    data: string[];
  }) => (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {data.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

  const MultiSelect = ({
    value,
    onChange,
    // placeholder,
    data,
  }: {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder: string;
    data: string[];
  }) => (
    <select
      multiple
      value={value}
      onChange={(e) =>
        onChange(
          Array.from(
            e.target.selectedOptions,
            (option) => option.value,
          ),
        )
      }
    >
      {data.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

  return {
    Table,
    TextInput,
    Select,
    MultiSelect,
  };
});

// Мок утилит
jest.mock('./resipes-table-utils', () => ({
  getUniqueIngredients: jest.fn(() => ['Ingredient1', 'Ingredient2']),
  getUniqueMainIngredients: jest.fn(() => [
    'MainIngredient1',
    'MainIngredient2',
  ]),
}));

// Моковые данные рецептов
const mockRecipes: IRecipe[] = [
  {
    recipeID: '1',
    Name: 'Test Recipe',
    description: 'Test Description',
    mainIngredient: {
      key: 'test-key',
      name: 'Test Main',
      quantity: 1,
      unitOfMeasurement: 'g',
    },
    ingredients: [],
    imgUrl: null,
  },
];

describe('RecipesTable', () => {
  it('renders table headers', () => {
    render(<RecipesTable recipes={mockRecipes} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Main Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
  });
});
