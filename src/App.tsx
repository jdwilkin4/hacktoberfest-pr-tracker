import { Heading, Center } from "@chakra-ui/react";
import { RepoTabs } from "./components/RepoTabs";

export default function App() {
  return (
    <>
      <Center>
        <Heading my="9">Hacktoberfest Open PR tracker</Heading>
      </Center>
      <RepoTabs />
    </>
  );
}
