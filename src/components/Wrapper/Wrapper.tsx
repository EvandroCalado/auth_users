import * as Styled from './Wrapper.styles';

export type WrapperProps = {
  children?: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

export default Wrapper;
