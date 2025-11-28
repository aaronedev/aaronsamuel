document.addEventListener("DOMContentLoaded", () => {
  // Typed.js initialization
  if (document.getElementById("typed")) {
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      backSpeed: 10,
      typeSpeed: 30,
      backDelay: 1000,
      loop: true,
      smartBackspace: true,
    });
  }

  // GitHub API initialization
  const username = "aaronedev";
  const repoList = document.getElementById("repo-list");

  if (repoList) {
    fetchGitHubRepos(username, repoList);
  }
});

async function fetchGitHubRepos(username, repoList) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error("Failed to fetch repositories or rate limit exceeded.");
      return;
    }

    repos.forEach((repo) => {
      const language = repo.language ? repo.language : "Not specified";
      const description = repo.description
        ? repo.description
        : "No description provided.";
      const topics =
        repo.topics.length > 0
          ? repo.topics.map((topic) => `#${topic}`).join(", ")
          : "No tags available";

      const repoElement = document.createElement("div");
      repoElement.classList.add("repo");

      repoElement.innerHTML = `
      <div class="repo-header">
        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
        <a href="${repo.html_url}/stargazers" target="_blank" class="repo-stars" style="text-decoration: none;">★ ${repo.stargazers_count}</a>
        <a href="${repo.html_url}/network/members" target="_blank" class="repo-forks" style="text-decoration: none;">🍴 ${repo.forks_count}</a>
      </div>
      <div class="repo-details">
        <p class="repo-description">
          <span class="repo-details-icon icon-description"></span>
          "description": "${description}",
        </p>
        <p class="repo-language">
          <span class="repo-details-icon icon-language"></span>
          "language": "${language}",
        </p>
        <p class="repo-tags">
          <span class="repo-details-icon icon-tags"></span>
          "tags": "${topics}"
        </p>
      </div>
    `;

      repoList.appendChild(repoElement);
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}
