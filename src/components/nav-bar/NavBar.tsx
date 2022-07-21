import * as C from '@chakra-ui/react';

type NavBarProps = {
  children?: React.ReactNode;
};
const NavBar = (props: NavBarProps) => {
  return (
    <C.HStack
      spacing="var(--space-md)"
      px="1rem"
      height={16}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth="var(--border-width)">
      <C.HStack as={'nav'} spacing="0" height={{ base: 'auto', md: '100%' }} display="flex">
        {props.children}
      </C.HStack>
    </C.HStack>
  );
};

export default NavBar;
