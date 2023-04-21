import FormLogin from './FormLogin';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { vi } from 'vitest';

describe('FormLogin', () => {
  it('should render the login form', () => {
    renderTheme(<FormLogin />);

    expect(screen.getByLabelText('Seu email')).toBeInTheDocument();
    expect(screen.getByLabelText('Sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    it('should call the onLogin prop with email and password when the form is submitted', async () => {
      const mockOnLogin = vi.fn();
      renderTheme(<FormLogin onLogin={mockOnLogin} />);

      const emailInput = screen.getByLabelText('Seu email');
      const passwordInput = screen.getByLabelText('Sua senha');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      expect(mockOnLogin).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Logando...' }),
        ).toBeDisabled();
      });
    });

    it('should display an error message if the errorMessage prop is provided', () => {
      const errorMessage = 'Invalid email or password';
      renderTheme(<FormLogin errorMessage={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
