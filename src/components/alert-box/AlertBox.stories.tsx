import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import AlertBox from './AlertBox';

export default {
  title: 'AlertBox',
  component: AlertBox,
} as Meta;

const Template: Story<ComponentProps<typeof AlertBox>> = (args) => (
  <AlertBox {...args}>This is an AlertBox</AlertBox>
);

export const AlertBoxStory = Template.bind({});
AlertBoxStory.args = { status: 'error' };
