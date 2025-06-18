import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditRecipe from './Edit-recipe';
import { getDataByIdFromFirebase } from '@/utils/getDataFromFirebase/getDataFromFirebase';
// import * as FireStoreFunctions from '@/utils/getDataFromFirebase/getDataFromFirebase';
import { RecipeKeys } from '@/core/recipe';
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

// Mock the Firebase functions
//* jest.mock('@/utils/getDataFromFirebase/getDataFromFirebase');
jest.mock('@/utils/getDataFromFirebase/getDataFromFirebase', () => ({
  getDataByIdFromFirebase: jest.fn(),
}));

jest.mock('@firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

// Mock the file upload utility
jest.mock('@/utils/upload-file/upload-file', () => ({
  uploadFile: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockRecipe = {
  [RecipeKeys.recipeName]: 'Test Recipe',
  [RecipeKeys.recipeDescription]: 'Test Description',
  [RecipeKeys.mainIngredient]: {
    key: 'test-key',
    name: 'Main Ingredient',
    quantity: 100,
    unitOfMeasurement: 'g',
  },
  [RecipeKeys.ingredients]: [
    {
      key: 'ingredient-1',
      name: 'Ingredient 1',
      quantity: 200,
      unitOfMeasurement: 'g',
    },
  ],
  [RecipeKeys.imgUrl]: 'http://test-image.jpg',
};

// Перед всеми тестами мокаем ResizeObserver
// @mantine/core использует ResizeObserver внутри своих компонентов, например, ScrollArea.
// В тестах без этого мокика оно выбросит ошибку и завершится аварийно, из-за чего не пройдет ваша проверка.
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('EditRecipe', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // jest.spyOn(FireStoreFunctions, 'getDataByIdFromFirebase');
    // .mockResolvedValue(mockRecipe);
  });

  it('renders loading state initially', () => {
    // (
    //   FireStoreFunctions.getDataByIdFromFirebase as jest.Mock
    // ).mockResolvedValue({});

    // Симулируем загрузку данных
    (getDataByIdFromFirebase as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );
    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('loads and displays recipe data', async () => {
    // (
    //   FireStoreFunctions.getDataByIdFromFirebase as jest.Mock
    // ).mockResolvedValue(mockRecipe);

    //*------------------
    (getDataByIdFromFirebase as jest.Mock).mockImplementation(
      async () => {
        console.log('getDataByIdFromFirebase вызван');
        return mockRecipe;
      },
    );

    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });

    // Ждём исчезновения загрузочного текста
    await waitFor(() => {
      expect(
        screen.queryByText('Loading...'),
      ).not.toBeInTheDocument();
      // screen.debug();
    });

    // await screen.debug(); // Выводим текущий DOM для отладки

    // Ждем, пока загрузка завершится и данные отобразятся

    expect(
      await screen.findByText(/Edit Recipe/i),
    ).toBeInTheDocument();

    /*
    expect(
      FireStoreFunctions.getDataByIdFromFirebase,
    ).toHaveBeenCalledWith('recipes', expect.any(String));
    expect(
      FireStoreFunctions.getDataByIdFromFirebase,
    ).toHaveBeenCalledTimes(1);
    */

    expect(
      screen.getByDisplayValue('Test Recipe'),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Test Description'),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Main Ingredient'),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  /*
  it('handles file input change', async () => {
    const user = userEvent.setup();
    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(screen.getByText('Edit Recipe')).toBeInTheDocument();
    });

    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(
      /Recipe Image/i,
    ) as HTMLInputElement;

    await user.upload(input, file);

    expect(input.files?.[0].name).toBe('test.png');
    expect(input.files?.length).toBe(1);
  });*/

  it('shows error message when data fetching fails', async () => {
    const errorMessage = 'Failed to load recipe';
    (getDataByIdFromFirebase as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Error: ${errorMessage}`),
      ).toBeInTheDocument();
    });
  });

  it('allows adding new ingredients', async () => {
    (getDataByIdFromFirebase as jest.Mock).mockResolvedValue(
      mockRecipe,
    );
    const user = userEvent.setup();
    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(screen.getByText(/Edit Recipe/i)).toBeInTheDocument();
      //screen.debug(); // Выводим текущий DOM для отладки
    });

    const addButton = screen.getByText('Add Ingredient');
    await user.click(addButton);

    const ingredientInputs = screen.getAllByPlaceholderText(
      'Enter ingredient name',
    );
    expect(ingredientInputs).toHaveLength(2); // Original + new ingredient
  });

  it('allows removing ingredients', async () => {
    (getDataByIdFromFirebase as jest.Mock).mockResolvedValue(
      mockRecipe,
    );
    const user = userEvent.setup();
    render(<EditRecipe recipeID="test-id" />, {
      wrapper: AllProviders,
    });

    await waitFor(() => {
      expect(screen.getByText('Edit Recipe')).toBeInTheDocument();
    });

    const deleteButtons = await screen.getAllByTestId(
      'delete-ingredient',
    );

    expect(deleteButtons).toHaveLength(1); // One ingredient initially
    await user.click(deleteButtons[0]);

    const remainingInputs = screen.queryAllByPlaceholderText(
      'Enter ingredient name',
    );
    expect(remainingInputs).toHaveLength(0);
  });
});
