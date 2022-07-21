import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CircleIcons from './CircleIcons';

export default {
  title: 'CircleIcons',
  component: CircleIcons,
} as Meta;

const Template: Story<ComponentProps<typeof CircleIcons>> = (args) => (
  <CircleIcons {...args}>This is an CircleIcons</CircleIcons>
);

export const CircleIconsStory = Template.bind({});
CircleIconsStory.args = {
  color: 'red.500',
  boxSize: 6,
};
