import Menu from './Menu';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const Template: StoryFn = (args) => (
  <div>
    <Menu {...args} />
  </div>
);
