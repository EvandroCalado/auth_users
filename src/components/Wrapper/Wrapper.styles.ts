import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin: 8rem auto; 
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.xlarge};
  `}
`;
