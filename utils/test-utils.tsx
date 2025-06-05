import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Mock Table component and its subcomponents
const TableComponent = {
  ScrollContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Thead: ({ children }: { children: React.ReactNode }) => (
    <thead>{children}</thead>
  ),
  Tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  Th: ({ children }: { children: React.ReactNode }) => (
    <th>{children}</th>
  ),
  Tr: ({ children }: { children: React.ReactNode }) => (
    <tr>{children}</tr>
  ),
  Td: ({ children }: { children: React.ReactNode }) => (
    <td>{children}</td>
  ),
};

// Mock Mantine components
jest.mock('@mantine/core', () => ({
  Table: { ...TableComponent },
  Select: () => <select />,
  TextInput: () => <input />,
  MultiSelect: () => <select multiple />,
}));

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, options);

export * from '@testing-library/react';
export { customRender as render };
