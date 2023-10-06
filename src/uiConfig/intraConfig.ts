


const urlConfig = {
  authorizeURL:"https://api.intra.42.fr/oauth/authorize",
  tokenURL:"https://api.intra.42.fr/oauth/token",
  meURL: "https://api.intra.42.fr/v2/me",
}



const envConfig = {
  client_id:process.env.PERR_DEFENSE_CLIENT_ID || "",
  client_secret:process.env.PEER_DEFENSE_CLIENT_SECRET || "",
  grant_type:process.env.PEER_DEFENSE_GRANT_TYPE || "",
  redirect_uri:process.env.PEER_DEFENSE_REDIRECT_URI || "",
}