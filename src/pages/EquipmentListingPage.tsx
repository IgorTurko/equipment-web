import * as C from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAsync } from 'react-async';
import { fetchEquipmentList } from '../clients/api';
import AlertBox from '../components/alert-box/AlertBox';
import EquipmentTable from '../components/equipment-table/EquipmentTable';
import { EquipmentType } from '../entities/equipment';

const DEFAULT_SEARCH_LIMIT = '5';

const EquipmentListingPage = () => {
  const location = useLocation();
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [searchLimit, setSearchLimit] = useState<string>('');
  const navigate = useNavigate();
  const { run, isPending, error } = useAsync<EquipmentType[]>({
    deferFn: ([searchParams]) => fetchEquipmentList(searchParams),
    onResolve: (data) => setEquipment(data),
  });

  useEffect(() => {
    const { search } = location;
    const limit = new URLSearchParams(search).get('limit') || DEFAULT_SEARCH_LIMIT;
    setSearchLimit(limit);

    run({ limit });
  }, [location]);

  let content = null;
  if (error) {
    <AlertBox status="error">{`Failed to fetch equipment: ${error.message}`}</AlertBox>;
  } else if (isPending) {
    content = <C.Spinner />;
  } else if (equipment) {
    content =
      equipment.length > 0 ? (
        <C.Stack w="100%">
          <EquipmentTable equipment={equipment} />
        </C.Stack>
      ) : (
        <AlertBox status="info">Equipemnt was not found</AlertBox>
      );
  }

  const doSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const query = new URLSearchParams(new FormData(e.target)).toString();
    navigate(`?${query}`);
  };

  return (
    <C.Container h="calc(100vh - 4rem)">
      <C.Heading mt={5} mb={5}>
        Equipment list:
      </C.Heading>
      <C.VStack align={'start'} mt={5} spacing={5}>
        <C.HStack w="100%" justifyContent={'space-between'}>
          <form onSubmit={doSearch}>
            <C.InputGroup>
              <C.InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
              <C.Input
                type="number"
                name="limit"
                value={searchLimit}
                onChange={(e) => {
                  setSearchLimit(e.target.value);
                }}
                placeholder="Provide number of equipment to fetch"
              />
            </C.InputGroup>
          </form>
          <C.IconButton
            aria-label="Add new equipment"
            icon={<AddIcon />}
            as={NavLink}
            end
            to="/equipment/new"
          />
        </C.HStack>
        {content}
      </C.VStack>
    </C.Container>
  );
};

export default EquipmentListingPage;
