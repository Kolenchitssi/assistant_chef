import { type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Header } from './Header';
import StoreProvider from '@/core/store/StoreProvider';

interface AllProvidersProps {
  children: ReactNode;
}

// Обертка с Mantine и Redux для рендера
const AllProviders: React.FC<AllProvidersProps> = ({ children }) => (
  <MantineProvider>
    <StoreProvider>{children} </StoreProvider>
  </MantineProvider>
);

describe('Header', () => {
  test('renders table headers', () => {
    render(<Header />, { wrapper: AllProviders });
    expect(screen.getByText('Assistant Chef')).toBeInTheDocument();

    // Пример проверки: элемент с ролью 'banner' присутствует
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // Проверка на наличие класса
    expect(screen.getByRole('banner')).toHaveClass('header'); //руфвук имеет роль banner см. https://www.w3.org/TR/html-aria/#docconformance

    //* Проверка на наличие у элемента header определенных стилей

    //toHaveStyle() проверяет все указанные свойства, и они должны точно совпадать.
    // В toHaveStyle() передается объект с CSS свойствами в camelCase или как строки.
    //! неработает тк проверяет инлайн-стили или стили, применяемые через style атрибут.
    //* Если стили заданы через CSS-классы, через CSS-in-JS или они не применены напрямую к элементу как inline-стили, то toHaveStyle() их не обнаружит.
    /* expect(screen.getByRole('banner')).toHaveStyle({
      // gap: '24px',
      // padding: '6px 12px 6px 32px',
      // zIndex: '2',
    });*/

    //! Важно getComputedStyle() в JSDOM (стандартная среда тестирования React) обычно не возвращает актуальные значения таких свойств, как gap, grid-template-columns, и других CSSGrid или Flexbox свойств.
    // Если стили заданы через класс в CSS нужно проверить вычисленные стили через window.getComputedStyle
    // const banner = screen.getByRole('banner');
    // const styles = window.getComputedStyle(banner);

    // Проверяем, что стиль задан правильно
    // expect(styles.gap).toBe('24px'); // неработает
    // expect(styles.padding).toBe('6px 12px 6px 32px'); // неработает
    // expect(styles.zIndex).toBe('2'); // неработает
  });
});
