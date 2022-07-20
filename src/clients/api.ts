import axios from 'axios';
import { isRight } from 'fp-ts/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';
import { API_URL } from '../config';

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

export async function fetchEquipmentList(limit): Promise<NoteItemType[]> {
  const { data: result } = await axios.get(`${API_URL}/v1/equipment`, { params: { limit: limit } });
  const equipments = result.data;

  if (!Array.isArray(equipments)) {
    throw new Error("List of equipments API did not return anything or didn't return an array");
  }

  const equipmentsDecoded = equipments.map((a) => {
    const ret = Equipment.decode(a);
    if (!isRight(ret)) {
      console.error('Invalid equipment item in list:', PathReporter.report(ret));
      throw new Error('Invalid equipment item in list');
    }

    return ret.right;
  });

  return equipmentsDecoded;
}
