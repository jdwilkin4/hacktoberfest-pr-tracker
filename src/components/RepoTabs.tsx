import { ErrorAlert } from "./ErrorAlert";
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
} from "../constants";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  css,
  Box,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Loading } from "./Loading";

export const RepoTabs = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    setTimeout(() => {
      getRepoData();
    }, 3000);
  }, []);

  if (isError) {
    return <ErrorAlert />;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
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
                <OrderedList>
                  {!repo.length ? (
                    <Box>No open PR's</Box>
                  ) : (
                    repo.map(({ title, html_url }, idx) => (
                      <ListItem>
                        <Link key={`${title}${idx}`} href={html_url} isExternal>
                          {title} <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                    ))
                  )}
                </OrderedList>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};
