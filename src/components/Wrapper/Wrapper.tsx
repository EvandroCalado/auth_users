import Menu from '../Menu/Menu';
import * as Styled from './Wrapper.styles';

export type WrapperProps = {
  children?: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Styled.Wrapper>
      <Menu />
      {children}
    </Styled.Wrapper>
  );
};

export default Wrapper;
