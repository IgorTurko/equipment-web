import axios from 'axios';
import nock from 'nock';
import { fetchEquipmentList } from './api';
import { API_URL } from '../config';
import httpAdapter from 'axios/lib/adapters/http';

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

beforeAll(() => {
  axios.defaults.adapter = httpAdapter;
});

describe('fetchEquipment', () => {
  test('should return array of equipment', async () => {
    const equipment = [
      {
        code: 'foo',
        address: 'faa',
        start_date: '2022-08-19',
        end_date: '2022-08-20',
        status: 'stopped',
      },
    ];

    const limit = 1;

    nock(API_URL).get('/v1/equipment').query({ limit: limit }).reply(200, { data: equipment });

    await expect(fetchEquipmentList(limit)).resolves.toEqual(equipment);
  });

  test('should return error if invalid note in array', async () => {
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

    const limit = 1;

    nock(API_URL).get('/v1/equipment').query({ limit: limit }).reply(200, { data: equipment });

    await expect(fetchEquipmentList(limit)).rejects.toEqual(
      new Error('Invalid equipment item in list')
    );
  });

  test('should return error if no array is returned', async () => {
    const equipment = 'bla';

    const limit = 1;

    nock(API_URL).get('/v1/equipment').query({ limit: limit }).reply(200, { data: equipment });

    await expect(fetchEquipmentList(limit)).rejects.toEqual(
      new Error("List of equipments API did not return anything or didn't return an array")
    );
  });
});
