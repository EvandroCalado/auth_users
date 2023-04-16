import styled, { css } from 'styled-components';
import { ButtonProps } from './Button';

export const Button = styled.button<Pick<ButtonProps, 'color'>>`
  ${({ theme, color }) => css`
    background-color: ${theme.colors[color]};
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.small};
    border: none;
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    border-radius: ${theme.spacings.tiny};
    transition: ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: 0 0 ${theme.spacings.tiny} ${theme.colors[color]};
      filter: brightness(110%);
    }

    &:hover {
      filter: brightness(90%);
    }

    &:disabled {
      background-color: ${theme.colors.gray4};
      color: ${theme.colors.gray1};
      cursor: not-allowed;

      &:hover {
        filter: none;
      }

    }
    
    > svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }
  `}
`;
