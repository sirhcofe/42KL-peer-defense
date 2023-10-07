

type urlConfigKeys = 'authorizeURL' | 'tokenURL' | 'meURL';

export const urlConfig: Record<urlConfigKeys, string> = {
  authorizeURL:"https://api.intra.42.fr/oauth/authorize",
  tokenURL:"https://api.intra.42.fr/oauth/token",
  meURL: "https://api.intra.42.fr/v2/me",
};

type envConfigKeys = 'client_id' | 'client_secret' | 'grant_type' | 'redirect_uri';

export const envConfig: Record<envConfigKeys, string> = {
  client_id:process.env.PEER_DEFENSE_CLIENT_ID || "",
  client_secret:process.env.PEER_DEFENSE_CLIENT_SECRET || "",
  grant_type:process.env.PEER_DEFENSE_GRANT_TYPE || "",
  redirect_uri:process.env.PEER_DEFENSE_REDIRECT_URI || "",
};

