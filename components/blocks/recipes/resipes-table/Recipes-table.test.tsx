import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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

// describe для групировки тестов
describe('RecipesTable', () => {
  it('renders table headers', () => {
    render(<RecipesTable recipes={mockRecipes} />);
    //screen.debug(); // вывести весь DOM в конслоль для проверки

    // поиск текста на странице
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Main Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();

    // если есть несколько на странице
    const descriptionElements = screen.getAllByText(/description/i); // Можно использовать регулярное выражение, здесь текст без учета регистра
    expect(descriptionElements.length).toBeGreaterThan(0); // убедиться, что есть совпадающие элементы
    // Или проверить конкретный элемент
    expect(descriptionElements[0]).toBeInTheDocument();

    // поиск элементов на странице
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();

    // если проверяем элемент которого может не быть
    expect(screen.queryByRole('button')).toBeNull();
  });

  // test тоже самое что и it
  test('render empty list', () => {
    render(<RecipesTable recipes={[]} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  // Проверка если при  изменении чего-то у нас изменилась структура таблицы
  test('table snapshot', () => {
    const table = render(<RecipesTable recipes={mockRecipes} />);
    expect(table).toMatchSnapshot();
  });

  // проверка действий  пользователя  ввод в поиск поля Name,
  // нужно дождатся обновления после ввода поэтому функция асинхронная
  test('Search Name is working', async () => {
    render(<RecipesTable recipes={mockRecipes} />);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText('Filter by name'),
      'myRecipe',
    );

    expect(screen.getByPlaceholderText('Filter by name')).toHaveValue(
      'myRecipe',
    );
  });
});
