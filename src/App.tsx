import {
  Heading,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  css,
  Box,
} from "@chakra-ui/react";
import { ErrorAlert } from "./components/ErrorAlert";
import { useEffect, useState } from "react";
import {
  REPOS_ARRAY,
  DEVELOPER_QUIZ_SITE,
  TECH_PODCASTS_PRS,
  TECH_BOOTCAMPS_PRS,
  DIVERSE_SPEAKERS,
  TECH_COMMUNITY_SLACKS,
  TECH_CONFERENCES_PRS,
  TECH_DEV_TOOLING,
  TECH_LEARNING_RESOURCES,
  TECH_MEETUP_PRS,
  TECH_NEWSLETTERS_PRS,
} from "./constants";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function App() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(DEVELOPER_QUIZ_SITE);
  const [repoData, setRepoData] = useState({
    fccData: [],
    podcastData: [],
    bootcampData: [],
    speakersData: [],
    slacksData: [],
    conferencesData: [],
    toolingData: [],
    coursesData: [],
    meetupsData: [],
    newslettersData: [],
  });

  const repoArrs = Object.values(repoData);

  useEffect(() => {
    const getRepoData = async () => {
      const repoUrls = [
        DEVELOPER_QUIZ_SITE,
        TECH_PODCASTS_PRS,
        TECH_BOOTCAMPS_PRS,
        DIVERSE_SPEAKERS,
        TECH_COMMUNITY_SLACKS,
        TECH_CONFERENCES_PRS,
        TECH_DEV_TOOLING,
        TECH_LEARNING_RESOURCES,
        TECH_MEETUP_PRS,
        TECH_NEWSLETTERS_PRS,
      ];
      setIsLoading(true);

      try {
        const [
          fccQuiz,
          podcasts,
          bootcamps,
          speakers,
          slacks,
          conferences,
          tooling,
          courses,
          meetups,
          newsletters,
        ] = await Promise.all(
          repoUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        setIsLoading(false);
        setRepoData({
          fccData: fccQuiz,
          podcastData: podcasts,
          bootcampData: bootcamps,
          speakersData: speakers,
          slacksData: slacks,
          conferencesData: conferences,
          toolingData: tooling,
          coursesData: courses,
          meetupsData: meetups,
          newslettersData: newsletters,
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
    <Box>
      <Center>
        <Heading my="9">Hacktoberfest Open PR tracker</Heading>
      </Center>

      {repoArrs.every((repo) => repo) && (
        <Tabs variant="enclosed">
          <TabList
            overflowX="auto"
            css={css({
              scrollbarWidth: "none",
              "::-webkit-scrollbar": { display: "none" },
              WebkitOverflowScrolling: "touch",
              boxShadow: "inset 0 -2px 0 rgba(0, 0, 0, 0.1)",
              border: "0 none",
            })}
          >
            {REPOS_ARRAY.map((repo, idx) => (
              <Tab key={`${repo}${idx}`}>{repo}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {repoArrs.map((repo, idx) => (
              <TabPanel key={`${repo}${idx}`}>
                {!repo.length
                  ? "No open PR's"
                  : repo.map(({ title, html_url }, idx) => (
                      <Box key={`${title}${idx}`}>
                        <Link href={html_url} isExternal>
                          {title} <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Box>
                    ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}
