import Button from '.';
import { fireEvent } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { VpnKey } from '@styled-icons/material-outlined';
import { vi } from 'vitest';

test('renders a disabled button when disabled prop is true', () => {
  const handleClick = vi.fn();
  const { getByRole } = renderTheme(
    <Button
      disabled={true}
      onClick={handleClick}
      color="primary"
      icon={<VpnKey />}
    >
      Click me
    </Button>,
  );
  const button = getByRole('button');

  expect(button).toBeDisabled();
});

test('calls onClick handler when button is clicked', () => {
  const handleClick = vi.fn();
  const { getByRole } = renderTheme(
    <Button onClick={handleClick} color="primary" icon={<VpnKey />}>
      Click me
    </Button>,
  );
  const button = getByRole('button');

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});

test('renders with the correct color', () => {
  const { getByRole } = renderTheme(
    <Button color="primary" icon={<VpnKey />}>
      Click me
    </Button>,
  );
  const button = getByRole('button');

  expect(button).toContainHTML('primary');
});

test('renders with the icon', () => {
  const { getByRole } = renderTheme(
    <Button color="primary" icon={<VpnKey />}>
      Click me
    </Button>,
  );
  const button = getByRole('button');
  const icon = button.lastChild;

  expect(icon).toBeInTheDocument();
});

test('to match snapshot', () => {
  const { container } = renderTheme(
    <Button color="primary" icon={<VpnKey />}>
      Click me
    </Button>,
  );
  expect(container).toMatchSnapshot();
});
