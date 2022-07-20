import * as t from 'io-ts';

const EquipmentStatusEnum = t.union([t.literal('running'), t.literal('stopped')]);

export const Equipment = t.type({
  code: t.string,
  address: t.string,
  start_date: t.string,
  end_date: t.string,
  status: EquipmentStatusEnum,
});

export type EquipmentType = t.TypeOf<typeof Equipment>;
export type EquipmentStatusEnumType = t.TypeOf<typeof EquipmentStatusEnum>;
