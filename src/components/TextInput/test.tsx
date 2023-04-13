import TextInput from '.';
import { fireEvent, screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { vi } from 'vitest';

test('renders the input field with a label', () => {
  renderTheme(<TextInput label="Username" name="username" />);

  const inputElement = screen.getByLabelText(/username/i);
  expect(inputElement).toBeInTheDocument();
});

test('calls onInputChange when the input value changes', () => {
  const handleInputChange = vi.fn();
  renderTheme(
    <TextInput
      label="Username"
      name="username"
      onInputChange={handleInputChange}
    />,
  );
  const inputElement = screen.getByLabelText(/username/i);

  fireEvent.change(inputElement, { target: { value: 'testValue' } });

  expect(handleInputChange).toHaveBeenCalledWith('testValue');
});

test('renders an error message when errorMessage prop is provided', () => {
  renderTheme(
    <TextInput
      label="Username"
      name="username"
      errorMessage="Invalid username"
    />,
  );
  const errorMessage = screen.getByText(/invalid username/i);

  expect(errorMessage).toBeInTheDocument();
});

test('renders the icon when the icon prop is provided and as prop is not "textarea"', () => {
  const icon = <span data-testid="icon">*</span>;
  renderTheme(<TextInput label="Search" name="search" icon={icon} />);

  const iconElement = screen.getByTestId('icon');

  expect(iconElement).toBeInTheDocument();
});

test('to match snapshot', () => {
  const { container } = renderTheme(<TextInput label="Search" name="search" />);

  expect(container).toMatchSnapshot();
});
