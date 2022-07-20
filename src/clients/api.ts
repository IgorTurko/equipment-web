import axios from 'axios';
import { isRight } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';
import { EquipmentType } from '../entities/equipment';
import { API_URL } from '../config';

export async function fetchEquipmentList(limit): Promise<EquipmentType[]> {
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
