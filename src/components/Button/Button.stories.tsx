import Button, { ButtonProps } from './Button';
import { Meta, StoryFn } from '@storybook/react';
import { VpnKey } from '@styled-icons/material-outlined';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Botão',
  },
} as Meta;

export const WithoutIcon: StoryFn<ButtonProps> = (args) => (
  <div>
    <Button {...args} />
  </div>
);

export const WithIcon: StoryFn<ButtonProps> = (args) => (
  <div>
    <Button {...args} icon={<VpnKey />} />
  </div>
);

export const SecondaryColor: StoryFn<ButtonProps> = (args) => (
  <div>
    <Button {...args} color="secondary" icon={<VpnKey />} />
  </div>
);

export const Disabled: StoryFn<ButtonProps> = (args) => (
  <div>
    <Button {...args} icon={<VpnKey />} disabled={true} />
  </div>
);
