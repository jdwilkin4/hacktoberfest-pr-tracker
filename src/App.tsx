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
import { TECH_PODCASTS_PRS, TECH_BOOTCAMPS_PRS } from "./url.constants";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [bootcampData, setBootcampData] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const repoUrls = [TECH_PODCASTS_PRS, TECH_BOOTCAMPS_PRS];

    const getData = async () => {
      setIsLoading(true);

      try {
        const [podcasts, bootcamps] = await Promise.all(
          repoUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        setIsLoading(false);
        setPodcastData(podcasts);
        setBootcampData(bootcamps);
      } catch (err) {
        console.error(`There was an error loading the data: ${err}`);
        setError(true);
      }
    };

    getData();
  }, []);

  if (error) {
    return <ErrorAlert />;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Center>
        <Heading my={3}>Hacktoberfest PR tracker</Heading>
      </Center>

      {podcastData && (
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Tech-podcasts</Tab>
            <Tab>Tech-bootcamps</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {!podcastData.length
                ? "No open PR's"
                : podcastData.map(({ title, html_url }, idx) => (
                    <Link key={idx} href={html_url} isExternal>
                      {title} <ExternalLinkIcon mx="2px" />
                    </Link>
                  ))}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}
