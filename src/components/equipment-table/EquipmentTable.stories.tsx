import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import EquipmentTable from './EquipmentTable';

export default {
  title: 'EquipmentTable',
  component: EquipmentTable,
} as Meta;

const Template: Story<ComponentProps<typeof EquipmentTable>> = (args) => (
  <EquipmentTable {...args}>This is an EquipmentTable</EquipmentTable>
);

export const EquipmentTableStory = Template.bind({});
EquipmentTableStory.args = {
  equipment: [
    {
      code: 'foo',
      address: 'Text 1',
      start_date: '2020-11-18',
      end_date: '2021-10-14',
      status: 'stopped',
    },
    {
      code: 'faa',
      address: 'Text 2',
      start_date: '2021-11-18',
      end_date: null,
      status: 'running',
    },
  ],
};
