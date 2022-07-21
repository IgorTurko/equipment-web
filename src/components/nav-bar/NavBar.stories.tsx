import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as C from '@chakra-ui/react';

import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
} as Meta;

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
  <NavBar {...args}>
    <C.Button variant="nav">Amazing page</C.Button>
    <C.Button variant="nav">More coolness</C.Button>
    <C.Button variant="nav">Thrid thing</C.Button>
  </NavBar>
);

export const NavBarStory = Template.bind({});
NavBarStory.args = {};
