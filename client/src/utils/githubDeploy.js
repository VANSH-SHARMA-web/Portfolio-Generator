export async function deployToGithubPages(pat, repoName, htmlString, logCallback) {
  const headers = {
    'Authorization': `token ${pat}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  try {
    // 1. Get the authenticated username
    logCallback('Authenticating with GitHub...');
    let userResp = await fetch('https://api.github.com/user', { headers });
    if (!userResp.ok) throw new Error('Authentication failed. Check your PAT.');
    const userData = await userResp.json();
    const owner = userData.login;
    logCallback(`Authenticated as ${owner}.`);

    // 2. Create the repository
    logCallback(`Creating public repository: ${repoName}...`);
    let createRepoResp = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: repoName,
        description: 'Auto-generated Portfolio by PortfolioGen',
        homepage: `https://${owner}.github.io/${repoName}/`,
        private: false,
        auto_init: true
      })
    });
    
    // If the repo already exists natively, we can just proceed to updating index.html
    if (createRepoResp.status === 422) {
      logCallback(`Repository ${repoName} already exists. Proceeding to update...`);
    } else if (!createRepoResp.ok) {
      throw new Error(`Failed to create repository: ${createRepoResp.statusText}`);
    }

    // Give GitHub API a brief moment if repo was just created
    await new Promise(r => setTimeout(r, 1000));

    // 3. Push index.html to the repository
    logCallback('Pushing index.html to repository...');
    
    // Check if index.html already exists to get its SHA for update
    let sha = undefined;
    const getFileResp = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/index.html`, { headers });
    if (getFileResp.ok) {
      const fileData = await getFileResp.json();
      sha = fileData.sha;
    }

    const encodedContent = btoa(unescape(encodeURIComponent(htmlString)));
    
    const pushResp = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/index.html`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Deploy Portfolio via PortfolioGen',
        content: encodedContent,
        sha: sha
      })
    });

    if (!pushResp.ok) throw new Error(`Failed to push index.html: ${pushResp.statusText}`);
    logCallback('index.html pushed successfully.');

    // 4. Enable GitHub Pages
    logCallback('Requesting GitHub Pages enablement...');
    const pagesResp = await fetch(`https://api.github.com/repos/${owner}/${repoName}/pages`, {
      method: 'POST',
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.switcheroo-preview+json' // Experimental preview header sometimes required
      },
      body: JSON.stringify({
        source: { branch: 'main', path: '/' }
      })
    });

    // It might fail if pages is already enabled or branch is master, handle gracefully
    if (!pagesResp.ok && pagesResp.status !== 409) {
      logCallback(`Note: Automatic Pages enablement ran into an issue (${pagesResp.status}). You might need to enable it manually in Repo Settings.`);
    } else {
      logCallback('GitHub Pages enablement triggered.');
    }

    logCallback('Deployment Success!');
    return `https://${owner}.github.io/${repoName}/`;

  } catch (error) {
    throw error;
  }
}
