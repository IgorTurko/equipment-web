import axios from 'axios';
import { isRight } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';
import { Equipment, EquipmentType } from '../entities/equipment';
import { API_URL } from '../config';

export type EquipmentSearchParamsType = {
  limit: number;
};

export async function fetchEquipmentList(
  searchParams: EquipmentSearchParamsType
): Promise<EquipmentType[]> {
  const { data: result } = await axios.get(`${API_URL}/v1/equipment`, { params: searchParams });
  const equipment = result.data;

  if (!Array.isArray(equipment)) {
    throw new Error("List of equipments API did not return anything or didn't return an array");
  }

  const equipmentsDecoded = equipment.map((equipmentItem) => {
    const ret = Equipment.decode(equipmentItem);
    if (!isRight(ret)) {
      console.error('Invalid equipment item in list:', PathReporter.report(ret));
      throw new Error('Invalid equipment item in list');
    }

    return ret.right;
  });

  return equipmentsDecoded;
}

export async function fetchEquipmentItemByCode(code: string): Promise<EquipmentType> {
  const { data: result } = await axios.get(`${API_URL}/v1/equipment/${code}`);
  const equipmentItem = result.data;

  const ret = Equipment.decode(equipmentItem);
  if (!isRight(ret)) {
    console.error('Invalid equipment item:', PathReporter.report(ret));
    throw new Error('Invalid equipment item');
  }

  return ret.right;
}

export async function saveEquipmentItem(params: EquipmentType): Promise<EquipmentType> {
  const { data: result } = await axios.post(`${API_URL}/v1/equipment`, params);
  const equipmentItem = result.data;

  const ret = Equipment.decode(equipmentItem);
  if (!isRight(ret)) {
    console.error('Invalid equipment item:', PathReporter.report(ret));
    throw new Error('Invalid equipment item');
  }

  return ret.right;
}
