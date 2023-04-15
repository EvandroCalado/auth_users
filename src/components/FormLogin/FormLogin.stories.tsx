import FormLogin, { FormLoginProps } from './FormLogin';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'FormLogin',
  component: FormLogin,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '4rem' }}>
          <Story />
        </div>
      );
    },
  ],
} as Meta;

export const WithoutError: StoryFn<FormLoginProps> = (args) => (
  <div>
    <FormLogin {...args} />
  </div>
);

export const WithError: StoryFn<FormLoginProps> = (args) => (
  <div>
    <FormLogin {...args} />
  </div>
);

WithError.args = {
  errorMessage: 'Mensagem de erro',
};
