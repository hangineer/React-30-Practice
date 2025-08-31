// https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28
const GITHUB_API_URL = 'https://api.github.com';
let headers = {
  "Accept": "application/vnd.github+json",
  "User-Agent": "GitHub-Issue-Filter-App",
  "X-GitHub-Api-Version": "2022-11-28"
};

export const fetchMilestones = async (owner, repo, token = null) => {
  try {

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/milestones?state=all`, { // per_page default 30
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.map(milestone => ({
      id: milestone.id,
      name: milestone.title,
      state: milestone.state
    }));
  } catch (error) {
    console.error('fetch milestones failed', error);
    return [];
  }
};

// authors = contributors
// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors
export const fetchAuthors = async (owner, repo, token = null) => {
  try {

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contributors?per_page=100`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("fetch authors", data);
    return data.map(contributor => ({
      id: contributor.id,
      name: contributor.login,
      avatar_url: contributor.avatar_url,
      login: contributor.login
    }));
  } catch (error) {
    console.error('fetch contributors failed', error);
    return [];
  }
};

export const fetchLabels = async (owner, repo, token = null) => {
  try {

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/labels?per_page=100`, { // per_page default 30
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data
      .map(label => ({
        id: label.id,
        name: label.name,
        color: label.color,
        description: label.description
      }));
  } catch (error) {
    console.error('fetch labels failed', error);
    return [];
  }
};

export const fetchIssues = async (owner, repo, token = null) => {
  try {
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/issues?state=all`, { // per_page default 30
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.map(issue => ({
      id: issue.id,
      title: issue.title,
      number: issue.number,
      state: issue.state,
      author: {
        id: issue.user.id,
        name: issue.user.login,
        avatar_url: issue.user.avatar_url
      },
      labels: issue.labels.map(label => ({
        id: label.id,
        name: label.name,
        color: label.color,
        description: label.description
      })),
      milestone: issue.milestone ? {
        id: issue.milestone.id,
        name: issue.milestone.title
      } : null,
      created_at: issue.created_at
    }));
  } catch (error) {
    console.error("fetch issues failed", error);
    return [];
  }
};
