import axios from 'axios';
import nock from 'nock';
import { fetchEquipmentList, fetchEquipmentItemByCode, saveEquipmentItem } from './api';
import { API_URL } from '../config';
import httpAdapter from 'axios/lib/adapters/http';

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

beforeAll(() => {
  axios.defaults.adapter = httpAdapter;
});

describe('fetchEquipmentList', () => {
  const SEARCH_PARAMS = { limit: 1 };

  test('should return list of equipment successfully', async () => {
    const equipment = [
      {
        code: 'foo',
        address: 'faa',
        start_date: '2022-08-19',
        end_date: '2022-08-20',
        status: 'stopped',
      },
    ];

    nock(API_URL).get('/v1/equipment').query(SEARCH_PARAMS).reply(200, { data: equipment });

    await expect(fetchEquipmentList(SEARCH_PARAMS)).resolves.toEqual(equipment);
  });

  test('should return error if invalid equipment item in array', async () => {
    const equipment = [
      {
        code: 'foo',
        address: 'faa',
        start_date: '2022-08-19',
        end_date: '2022-08-20',
        // bad_status here
        status: 'bad_status',
      },
    ];

    nock(API_URL).get('/v1/equipment').query(SEARCH_PARAMS).reply(200, { data: equipment });

    await expect(fetchEquipmentList(SEARCH_PARAMS)).rejects.toEqual(
      new Error('Invalid equipment item in list')
    );
  });

  test('should return error if no array is returned', async () => {
    const equipment = 'bla';

    nock(API_URL).get('/v1/equipment').query(SEARCH_PARAMS).reply(200, { data: equipment });

    await expect(fetchEquipmentList(SEARCH_PARAMS)).rejects.toEqual(
      new Error("List of equipments API did not return anything or didn't return an array")
    );
  });
});

describe('fetchEquipmentItemByCode', () => {
  test('should return equipment item successfully', async () => {
    const equipmentItem = {
      code: 'foo',
      address: 'faa',
      start_date: '2022-08-19',
      end_date: '2022-08-20',
      status: 'stopped',
    };

    nock(API_URL).get(`/v1/equipment/${equipmentItem.code}`).reply(200, { data: equipmentItem });

    await expect(fetchEquipmentItemByCode(equipmentItem.code)).resolves.toEqual(equipmentItem);
  });

  test('should return error if invalid equipment item in response', async () => {
    const equipmentItem = {
      code: 'foo',
      address: 'faa',
      start_date: '2022-08-19',
      end_date: '2022-08-20',
      // bad_status here
      status: 'bad_status',
    };

    nock(API_URL).get(`/v1/equipment/${equipmentItem.code}`).reply(200, { data: equipmentItem });

    await expect(fetchEquipmentItemByCode(equipmentItem.code)).rejects.toEqual(
      new Error('Invalid equipment item')
    );
  });
});

describe('saveEquipmentItem', () => {
  test('should save and return saved equipment item', async () => {
    const equipmentItem = {
      code: 'foo',
      address: 'faa',
      start_date: '2022-08-19',
      end_date: '2022-08-20',
      status: 'stopped',
    };

    nock(API_URL).post('/v1/equipment').reply(201, { data: equipmentItem });

    // @ts-ignore
    await expect(saveEquipmentItem(equipmentItem)).resolves.toEqual(equipmentItem);
  });

  test('should return error if invalid equipment item in response', async () => {
    const equipmentItem = {
      code: 'foo',
      address: 'faa',
      start_date: '2022-08-19',
      end_date: '2022-08-20',
      // bad_status here
      status: 'bad_status',
    };

    nock(API_URL).post('/v1/equipment').reply(201, { data: equipmentItem });

    // @ts-ignore
    await expect(saveEquipmentItem(equipmentItem)).rejects.toEqual(
      new Error('Invalid equipment item')
    );
  });
});
