import * as C from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-async';
import { fetchEquipmentByCode } from '../clients/api';
import AlertBox from '../components/alert-box/AlertBox';
import { EquipmentType } from '../entities/equipment';

const EquipmentItemPage = () => {
  const { code = '' } = useParams<{ code: string }>();
  const memoizedFetchByCode = useCallback(() => fetchEquipmentByCode(code), [code]);
  const { data, isPending, error } = useAsync<EquipmentType>(memoizedFetchByCode);

  let content = null;
  if (error) {
    <AlertBox status="error">{`Failed to fetch equipment item: ${error.message}`}</AlertBox>;
  } else if (isPending) {
    content = <C.Spinner />;
  } else if (data) {
    content = (
      <C.Stack w="100%">
        <C.Heading mt={5} mb={5}>
          Equipment item details:
        </C.Heading>
        <C.FormControl>
          <C.FormLabel>Code</C.FormLabel>
          <C.Input type="text" value={data.code} disabled={true} />
        </C.FormControl>
        <C.FormControl>
          <C.FormLabel>Address</C.FormLabel>
          <C.Input type="text" value={data.address} disabled={true} />
        </C.FormControl>
        <C.FormControl>
          <C.FormLabel>Start date</C.FormLabel>
          <C.Input type="date" value={data.start_date || 'N/A'} disabled={true} />
        </C.FormControl>
        <C.FormControl>
          <C.FormLabel>End date</C.FormLabel>
          <C.Input type="date" value={data.end_date || 'N/A'} disabled={true} />
        </C.FormControl>
        <C.FormControl>
          <C.FormLabel>Status</C.FormLabel>
          <C.Input type="text" value={data.status} disabled={true} />
        </C.FormControl>
      </C.Stack>
    );
  }

  return <C.Container h="calc(100vh - 4rem)">{content}</C.Container>;
};

export default EquipmentItemPage;
