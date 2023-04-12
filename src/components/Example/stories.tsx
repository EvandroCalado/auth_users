import Example, { ExampleProps } from '.';
import { Meta, StoryFn } from '@storybook/react/';

export default {
  title: 'Example',
  component: Example,
} as Meta;

export const Template: StoryFn<ExampleProps> = (args) => (
  <div>
    <Example {...args} />
  </div>
);
