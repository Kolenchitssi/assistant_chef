import React, { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeDetails from './Recipe-details';
import { getDataByIdFromFirebase } from '@/utils/getDataFromFirebase/getDataFromFirebase';
import { MantineProvider } from '@mantine/core';
import StoreProvider from '@/core/store/StoreProvider';

// Mock the useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    route: '/some-route',
    asPath: '/some-route',
  }),
}));

// Обертка с Mantine и Redux для рендера
interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => (
  <MantineProvider>
    <StoreProvider>{children} </StoreProvider>
  </MantineProvider>
);

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
    // Мокаем загрузку
    (getDataByIdFromFirebase as jest.Mock).mockResolvedValue(null);

    render(<RecipeDetails recipeID="1" />, {
      wrapper: AllProviders,
    });

    // Ждём исчезновения загрузочного текста
    await waitFor(() => {
      expect(
        screen.queryByText('Loading...'),
      ).not.toBeInTheDocument();
      // screen.debug(); //выводим на экран текущий DOM для отладки
    });

    // Теперь ищем "Recipe not found"
    expect(
      await screen.findByText('Recipe not found'),
    ).toBeInTheDocument();
  });
});
