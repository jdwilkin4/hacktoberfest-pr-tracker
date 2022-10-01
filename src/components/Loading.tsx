import { Center, Spinner } from "@chakra-ui/react";
export const Loading = () => {
  return (
    <Center>
      <Spinner marginRight="10px" color="blue.500" /> Loading Data...
    </Center>
  );
};
