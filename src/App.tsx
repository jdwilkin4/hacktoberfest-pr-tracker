import {
  Heading,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
} from "@chakra-ui/react";
import { ErrorAlert } from "./components/ErrorAlert";
import { useEffect, useState } from "react";
import { TECH_PODCASTS_PRS, TECH_BOOTCAMPS_PRS } from "./constants";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function App() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [repoData, setRepoData] = useState({
    podcastData: [],
    bootcampData: [],
  });

  const repoArrs = Object.values(repoData);

  useEffect(() => {
    const getRepoData = async () => {
      const repoUrls = [TECH_PODCASTS_PRS, TECH_BOOTCAMPS_PRS];
      setIsLoading(true);

      try {
        const [podcasts, bootcamps] = await Promise.all(
          repoUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        setIsLoading(false);
        setRepoData({
          podcastData: podcasts,
          bootcampData: bootcamps,
        });
      } catch (err) {
        console.error(`There was an error loading the data: ${err}`);
        setIsError(true);
      }
    };

    getRepoData();
  }, []);

  if (isError) {
    return <ErrorAlert />;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Center>
        <Heading my={3}>Hacktoberfest Open PR tracker</Heading>
      </Center>

      {repoArrs.every((repo) => repo) && (
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Tech-podcasts</Tab>
            <Tab>Tech-bootcamps</Tab>
          </TabList>
          <TabPanels>
            {repoArrs.map((repo, idx) => (
              <TabPanel key={idx}>
                {!repo.length
                  ? "No open PR's"
                  : repo.map(({ title, html_url }, idx) => (
                      <Link key={idx} href={html_url} isExternal>
                        {title} <ExternalLinkIcon mx="2px" />
                      </Link>
                    ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}
