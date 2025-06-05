import { render, screen } from '@/utils/test-utils';
import '@testing-library/jest-dom';
import Home from './Home';

// Mock the Recipes component since we don't want to test its implementation here
jest.mock('@/components/blocks/recipes/Recipes', () => {
  return function MockRecipes() {
    return <div data-testid="recipes-mock">Recipes Mock</div>;
  };
});

describe('Home component', () => {
  test('renders homepage with title', () => {
    render(<Home />);
    expect(screen.getByText('Recipes:')).toBeInTheDocument();
  });

  test('renders recipes component', () => {
    render(<Home />);
    expect(screen.getByTestId('recipes-mock')).toBeInTheDocument();
  });
});
