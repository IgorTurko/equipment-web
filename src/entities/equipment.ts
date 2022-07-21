import * as t from 'io-ts';

const EquipmentStatusEnum = t.union([t.literal('running'), t.literal('stopped')]);

export const Equipment = t.type({
  code: t.string,
  address: t.string,
  start_date: t.union([t.string, t.null]),
  end_date: t.union([t.string, t.null]),
  status: EquipmentStatusEnum,
});

export type EquipmentType = t.TypeOf<typeof Equipment>;
export type EquipmentStatusEnumType = t.TypeOf<typeof EquipmentStatusEnum>;
