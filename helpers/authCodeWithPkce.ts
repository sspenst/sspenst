// https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);
  // we are restarting the auth flow, make sure any old access token is gone
  localStorage.removeItem('accessToken');

  document.location = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    client_id: clientId,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    redirect_uri: 'http://localhost:3000/spotify',
    response_type: 'code',
    scope: 'user-read-private playlist-modify-private',
  })}`;
}

function generateCodeVerifier(length: number) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem('verifier');

  if (!verifier) {
    await redirectToAuthCodeFlow(clientId);

    return;
  }

  const result = await fetch('https://accounts.spotify.com/api/token', {
    body: new URLSearchParams({
      client_id: clientId,
      code: code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/spotify',
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  });

  if (!result.ok) {
    await redirectToAuthCodeFlow(clientId);

    return;
  }

  const { access_token } = await result.json();

  localStorage.setItem('accessToken', access_token);

  return access_token as string;
}
