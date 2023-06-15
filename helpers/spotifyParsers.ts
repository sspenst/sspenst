import { spotifyFetch } from './authCodeWithPkce';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Artist {
  id: string;
  name: string;
}

export interface Track {
  artists: Artist[];
  features: Record<string, string>;
  genres: string[];
  href: string;
  id: string;
  image: string;
  name: string;
  preview: HTMLAudioElement;
  seconds: number;
  uri: string;
}

function parseTrack(track: any, audioFeature: any): Track {
  const features: Record<string, string> = {};
  const preview = new Audio(track.preview_url);

  preview.loop = true;

  if (audioFeature) {
    features.acousticness = audioFeature.acousticness;
    features.danceability = audioFeature.danceability;
    features.energy = audioFeature.energy;
    features.instrumentalness = audioFeature.instrumentalness;
    features.key = audioFeature.key;
    features.liveness = audioFeature.liveness;
    features.loudness = audioFeature.loudness;
    features.mode = audioFeature.mode;
    features.speechiness = audioFeature.speechiness;
    features.tempo = audioFeature.tempo;
    features.time_signature = audioFeature.time_signature;
    features.valence = audioFeature.valence;
  }

  return {
    artists: track.artists.map((a: any) => {
      return {
        id: a.id,
        name: a.name,
      };
    }),
    features: features,
    genres: track.album.genres ?? [],
    href: track.external_urls.spotify,
    id: track.id,
    image: track.album.images[0]?.url ?? '/rabbit/music.svg',
    name: track.name,
    preview: preview,
    seconds: Math.round(track.duration_ms / 1000),
    uri: track.uri,
  } as Track;
}

export async function parseTracks(tracks: any): Promise<Track[]> {
  if (!tracks) {
    return [];
  }

  // preview url can be null, but audio is essential here so need to filter these results
  // https://github.com/spotify/web-api/issues/148#issuecomment-313924088
  const filteredTracks = tracks.filter((t: any) => !!t.preview_url);

  const audioFeatures = await spotifyFetch(`https://api.spotify.com/v1/audio-features?${new URLSearchParams({
    ids: filteredTracks.map((f: any) => f.id).join(','),
  })}`, {
    method: 'GET',
  });

  return filteredTracks.map((t: any, i: number) => parseTrack(t, audioFeatures?.audio_features[i]));
}

export interface User {
  href: string;
  id: string;
  image: string;
  name: string;
}

export function parseUser(user: any): User | null {
  if (!user) {
    return null;
  }

  return {
    href: user.external_urls.spotify,
    id: user.id,
    image: user.images[0]?.url ?? '/rabbit/user.svg',
    name: user.display_name,
  };
}
