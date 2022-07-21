import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { EquipmentType } from '../../entities/equipment';
import CircleIcon from '../icons/CircleIcons';

type EquipmentTablePropsType = {
  equipment: EquipmentType[];
};

const EquipmentTable = (props: EquipmentTablePropsType) => {
  const { equipment } = props;

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Address</Th>
            <Th>Start date</Th>
            <Th>End date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {equipment.map((equipmentItem) => {
            return (
              <Tr>
                <Td>{equipmentItem.code}</Td>
                <Td>{equipmentItem.address}</Td>
                <Td>{equipmentItem.start_date || 'N/A'}</Td>
                <Td>{equipmentItem.end_date || 'N/A'}</Td>
                <Td>
                  {equipmentItem.status === 'running' ? (
                    <CircleIcon boxSize={6} color="green.500" />
                  ) : (
                    <CircleIcon boxSize={6} color="red.500" />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EquipmentTable;
