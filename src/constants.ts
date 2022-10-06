const GITHUB_API_REPO_URL = "https://api.github.com/repos/";
const PR_OPEN_QUERY_PARAM = "pulls?state=open";

export const REPOS_ARRAY: string[] = [
  "Developer Quiz Site",
  "tech-podcasts",
  "tech-bootcamps",
  "diverse-speakers",
  "tech-community-slacks",
  "tech-conferences",
  "tech-dev-tooling",
  "tech-learning-resources",
  "tech-meetups",
  "tech-newsletters",
  "framework.dev",
];

export const DEVELOPER_QUIZ_SITE = `${GITHUB_API_REPO_URL}freeCodeCamp/Developer_Quiz_Site/${PR_OPEN_QUERY_PARAM}`;
export const TECH_PODCASTS_PRS = `${GITHUB_API_REPO_URL}thisdot/tech-podcasts/${PR_OPEN_QUERY_PARAM}`;
export const TECH_BOOTCAMPS_PRS = `${GITHUB_API_REPO_URL}thisdot/tech-bootcamps/${PR_OPEN_QUERY_PARAM}`;
export const TECH_NEWSLETTERS_PRS = `${GITHUB_API_REPO_URL}thisdot/tech-newsletters/${PR_OPEN_QUERY_PARAM}`;
export const TECH_CONFERENCES_PRS = `${GITHUB_API_REPO_URL}thisdot/tech-conferences/${PR_OPEN_QUERY_PARAM}`;
export const TECH_MEETUP_PRS = `${GITHUB_API_REPO_URL}thisdot/tech-meetups/${PR_OPEN_QUERY_PARAM}`;
export const TECH_COMMUNITY_SLACKS = `${GITHUB_API_REPO_URL}thisdot/tech-community-slacks/${PR_OPEN_QUERY_PARAM}`;
export const TECH_DEV_TOOLING = `${GITHUB_API_REPO_URL}thisdot/tech-dev-tooling/${PR_OPEN_QUERY_PARAM}`;
export const TECH_LEARNING_RESOURCES = `${GITHUB_API_REPO_URL}thisdot/tech-learning-resources/${PR_OPEN_QUERY_PARAM}`;
export const DIVERSE_SPEAKERS = `${GITHUB_API_REPO_URL}thisdot/diverse-speakers/${PR_OPEN_QUERY_PARAM}`;
export const FRAMEWORK_DEV = `${GITHUB_API_REPO_URL}thisdot/framework.dev/${PR_OPEN_QUERY_PARAM}`;
