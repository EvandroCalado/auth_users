import Example from '.';
import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';

describe('<Example />', () => {
  it('should render', () => {
    renderTheme(<Example />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
