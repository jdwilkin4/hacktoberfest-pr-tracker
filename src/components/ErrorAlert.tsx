import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
} from "@chakra-ui/react";

export const ErrorAlert = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Error! No data to show
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        There was an error loading your data. Try again later.
      </AlertDescription>
    </Alert>
  );
};
