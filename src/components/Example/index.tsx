import * as Styled from './styles';

export type ExampleProps = {
  title?: string;
};
const Example = ({ title = 'Example' }: ExampleProps) => {
  return (
    <Styled.Wrapper>
      <h1>{title}</h1>
    </Styled.Wrapper>
  );
};

export default Example;
