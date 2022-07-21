import { Alert, AlertIcon, AlertStatus } from '@chakra-ui/react';

const AlertBox = ({ status = 'error', children }: { status?: AlertStatus; children: string }) => (
  <Alert status={status}>
    <AlertIcon />
    {children}
  </Alert>
);

export default AlertBox;
