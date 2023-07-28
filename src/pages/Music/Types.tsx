
export type CreateTrackListRequest = {
  list_of_songs: string[][];
  number_of_songs?: Number;
}

export type SaveSongListRequest = {
  uri_list: string[];
  list_name?: Number;
  date?: string;
}

export type SpotifyOAuthRequest = {
  response_type: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
  state?: string;
  show_dialog? : string;
}