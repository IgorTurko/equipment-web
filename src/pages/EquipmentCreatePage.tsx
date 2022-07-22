import * as C from '@chakra-ui/react';
import React from 'react';
import { useAsync } from 'react-async';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { saveEquipmentItem } from '../clients/api';
import { EquipmentType } from '../entities/equipment';
import { showErrorToast, showSuccessToast } from '../components/helpers';

const EquipmentItemPage = () => {
  const { run, isPending } = useAsync<EquipmentType>({
    deferFn: ([data]) => {
      return saveEquipmentItem(data);
    },
    onResolve: (data) => {
      reset();
      clearErrors();
      showSuccessToast('Success', 'New equipment item added');
    },
    onReject: (e) => {
      showErrorToast(
        'Error',
        // @ts-ignore
        e?.response?.data?.message || 'Something went wrong'
      );
    },
  });
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    clearErrors
  } = useForm<EquipmentType>({
    mode: 'onChange',
    defaultValues: {
      code: '',
      address: '',
      start_date: '',
      end_date: '',
      status: 'running',
    },
  });

  let content = (
    <C.Stack w="100%">
      <C.Heading mt={5} mb={5}>
        New equipment item details:
      </C.Heading>
      <form onSubmit={handleSubmit(run)}>
        <C.FormControl isInvalid={!!errors.code}>
          <C.FormLabel>Code</C.FormLabel>
          <C.Input
            placeholder="Code of a new equipment?"
            {...register('code', { required: true })}
          />
        </C.FormControl>
        <C.FormControl isInvalid={!!errors.address}>
          <C.FormLabel>Address</C.FormLabel>
          <C.Input
            placeholder="Address of new equipment?"
            {...register('address', { required: true })}
          />
        </C.FormControl>
        <C.FormControl isInvalid={!!errors.start_date}>
          <C.FormLabel>Start date</C.FormLabel>
          <C.Input
            type="date"
            placeholder="Start date of a new equipment?"
            {...register('start_date', { required: false })}
          />
        </C.FormControl>
        <C.FormControl isInvalid={!!errors.end_date}>
          <C.FormLabel>End date</C.FormLabel>
          <C.Input
            type="date"
            placeholder="End date of a new equipment?"
            {...register('end_date', { required: false })}
          />
        </C.FormControl>
        <C.FormControl isInvalid={!!errors.status}>
          <C.FormLabel>Status</C.FormLabel>
          <C.Select
            placeholder="Status of a new equipment?"
            {...register('status', { required: true })}>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
          </C.Select>
        </C.FormControl>
        <C.HStack spacing={3} mt={8} justifyContent="flex-end">
          <C.Button as={NavLink} end to="/equipment">
            Back
          </C.Button>
          <C.Button disabled={!isValid || isPending} type="submit">
            Save
          </C.Button>
        </C.HStack>
      </form>
    </C.Stack>
  );

  return <C.Container h="calc(100vh - 4rem)">{content}</C.Container>;
};

export default EquipmentItemPage;
