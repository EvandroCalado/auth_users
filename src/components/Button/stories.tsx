import Button, { ButtonProps } from '.';
import { Meta, StoryFn } from '@storybook/react';
import { VpnKey } from '@styled-icons/material-outlined';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Texto do Botão',
    icon: <VpnKey />,
  },
} as Meta;

export const Template: StoryFn<ButtonProps> = (args) => (
  <div>
    <Button {...args} />
  </div>
);
