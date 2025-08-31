// TODO: improve code
import { useState, useEffect } from "react";
import GitHubFilter from "@/component/GitHubFilter";
import LabelBadge from "@/component/LabelBadge";
import {
  fetchMilestones,
  fetchAuthors,
  fetchLabels,
  fetchIssues,
} from "@/api/githubApi";
import { Button } from "@headlessui/react";

const DEFAULT_REPO = {
  owner: "facebook",
  repo: "react",
};

function Day13() {
  const [filterData, setFilterData] = useState({
    milestones: [],
    authors: [],
    labels: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    milestones: [],
    authors: [],
    labels: [],
  });
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repoConfig, setRepoConfig] = useState(DEFAULT_REPO);

  const githubToken = import.meta.env.VITE_GITHUB_TOKEN || "";

  // load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [milestones, authors, labels, issuesData] = await Promise.all([
          fetchMilestones(repoConfig.owner, repoConfig.repo, githubToken),
          fetchAuthors(repoConfig.owner, repoConfig.repo, githubToken),
          fetchLabels(repoConfig.owner, repoConfig.repo, githubToken),
          fetchIssues(repoConfig.owner, repoConfig.repo, githubToken),
        ]);

        setFilterData({ milestones, authors, labels });
        setIssues(issuesData);
      } catch (error) {
        console.error("load data failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [repoConfig, githubToken]);

  useEffect(() => {
    let filtered = [...issues];

    // filter milestones
    if (selectedFilters.milestones.length > 0) {
      const milestoneIds = selectedFilters.milestones.map((m) => m.id);
      filtered = filtered.filter(
        (issue) => issue.milestone && milestoneIds.includes(issue.milestone.id)
      );
    }

    // filter authors
    if (selectedFilters.authors.length > 0) {
      const authorIds = selectedFilters.authors.map((a) => a.id);
      filtered = filtered.filter((issue) =>
        authorIds.includes(issue.author.id)
      );
    }

    // filter labels
    if (selectedFilters.labels.length > 0) {
      const labelIds = selectedFilters.labels.map((l) => l.id);
      filtered = filtered.filter((issue) =>
        issue.labels.some((label) => labelIds.includes(label.id))
      );
    }

    setFilteredIssues(filtered);
  }, [issues, selectedFilters]);

  const handleFilterChange = (filterType, selectedItems) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: selectedItems,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      milestones: [],
      authors: [],
      labels: [],
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("zh-TW");
  };

  const createdInfo = (issue) => (
    <>
      By <b>{issue.author.name}</b> at <b>{formatDate(issue.created_at)}</b>
    </>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto w-full min-h-screen overflow-x-hidden">
      <h2 className="text-2xl mb-4">
        Day 13: Build the Github Issues Filter component
      </h2>
      <a
        href="https://reactpractice.dev/exercise/build-the-github-issue-filter-component/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1"
        className="text-blue-600 hover:text-blue-800 mb-6 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        題目連結
      </a>

      {/* GitHub Token status display */}
      {githubToken ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 w-full">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ GitHub Token is set
          </h3>
          <p className="text-green-700 text-sm">
            GitHub Token is loaded from environment variables, API rate limit
            has been increased.
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 w-full">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ GitHub Token is not set
          </h3>
          <p className="text-yellow-700 text-sm mb-2">
            GitHub Token is not set, may encounter API rate limit (403 error).
          </p>
        </div>
      )}

      {/* Repo */}
      <div className="bg-blue-50 text-black p-4 rounded-lg mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">GitHub Repo Setting</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Owner:</label>
            <input
              type="text"
              value={repoConfig.owner}
              onChange={(e) =>
                setRepoConfig((prev) => ({ ...prev, owner: e.target.value }))
              }
              className="px-3 py-1 border border-gray-300 rounded text-sm"
              placeholder="e.g. facebook"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Repo:</label>
            <input
              type="text"
              value={repoConfig.repo}
              onChange={(e) =>
                setRepoConfig((prev) => ({ ...prev, repo: e.target.value }))
              }
              className="px-3 py-1 border border-gray-300 rounded text-sm"
              placeholder="e.g. react"
            />
          </div>
          <Button
            onClick={() => setRepoConfig(DEFAULT_REPO)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Reset to default
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Currently displaying: {repoConfig.owner}/{repoConfig.repo} Issues
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 text-black p-4 rounded-lg mb-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Milestones
            </label>
            <GitHubFilter
              title="Select Milestones"
              items={filterData.milestones}
              selectedItems={selectedFilters.milestones}
              onSelectionChange={(items) =>
                handleFilterChange("milestones", items)
              }
              placeholder="Search milestones"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authors
            </label>
            <GitHubFilter
              title="Select Authors"
              items={filterData.authors}
              selectedItems={selectedFilters.authors}
              onSelectionChange={(items) =>
                handleFilterChange("authors", items)
              }
              placeholder="Search authors"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels
            </label>
            <GitHubFilter
              title="Select Labels"
              items={filterData.labels}
              selectedItems={selectedFilters.labels}
              onSelectionChange={(items) => handleFilterChange("labels", items)}
              placeholder="Search labels"
            />
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white text-black border border-gray-200 rounded-lg w-full">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Issues ({filteredIssues.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200 min-h-[400px] max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No issues found
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div key={issue.id} className="px-4 py-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        issue.state === "open"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        {issue.title}
                      </h4>
                      <span className="text-sm text-gray-500">
                        #{issue.number}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                      <span>{createdInfo(issue)}</span>
                      {issue.milestone && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {issue.milestone.name}
                        </span>
                      )}
                    </div>

                    {issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {issue.labels.map((label) => (
                          <LabelBadge key={label.id} label={label} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Day13;
