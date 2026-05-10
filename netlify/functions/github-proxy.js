// Netlify Function: github-proxy
//
// Forwards GitHub Contents API requests on behalf of admin.html so the GitHub
// PAT never ships to the browser. Requires Netlify env vars:
//   GITHUB_TOKEN     — classic PAT with `repo` scope
//   ADMIN_PASSWORD   — must match the password the admin enters at login
//
// Repo is hardcoded below (not a secret).
// Requires Node 18+ runtime (Netlify default) for global fetch.

const OWNER  = 'jlaycock31';
const REPO   = 'dionnes-flowers-site';

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return resp(405, { error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const githubToken   = process.env.GITHUB_TOKEN;
  if (!adminPassword) return resp(500, { error: 'Server missing ADMIN_PASSWORD env var' });
  if (!githubToken)   return resp(500, { error: 'Server missing GITHUB_TOKEN env var' });

  const headers = lowerKeys(event.headers || {});
  const provided = headers['x-admin-password'];
  if (provided !== adminPassword) {
    return resp(401, { error: 'Unauthorized' });
  }

  let req;
  try { req = JSON.parse(event.body || '{}'); }
  catch (_) { return resp(400, { error: 'Invalid JSON body' }); }

  const method = (req.method || 'GET').toUpperCase();
  const path   = typeof req.path === 'string' ? req.path : '';
  const body   = req.body;

  if (!['GET', 'PUT'].includes(method)) {
    return resp(400, { error: 'Method not permitted' });
  }
  if (!path || path.startsWith('/') || path.includes('..')) {
    return resp(400, { error: 'Invalid path' });
  }

  const url = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/contents/' + path;

  const ghHeaders = {
    'Authorization': 'token ' + githubToken,
    'Accept':        'application/vnd.github.v3+json',
    'User-Agent':    'dionnes-flowers-admin'
  };

  const fetchOpts = { method, headers: ghHeaders };
  if (method === 'PUT') {
    ghHeaders['Content-Type'] = 'application/json';
    fetchOpts.body = JSON.stringify(body || {});
  }

  let ghResp;
  try {
    ghResp = await fetch(url, fetchOpts);
  } catch (err) {
    return resp(502, { error: 'Upstream fetch failed: ' + err.message });
  }

  const text = await ghResp.text();
  return {
    statusCode: ghResp.status,
    headers: Object.assign(
      { 'Content-Type': ghResp.headers.get('content-type') || 'application/json' },
      corsHeaders()
    ),
    body: text
  };
};

function resp(statusCode, obj) {
  return {
    statusCode,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders()),
    body: JSON.stringify(obj)
  };
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}

function lowerKeys(obj) {
  const out = {};
  for (const k of Object.keys(obj)) out[k.toLowerCase()] = obj[k];
  return out;
}
