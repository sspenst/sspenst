/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Artist {
  id: string;
  name: string;
}

export interface Track {
  artists: Artist[];
  genres: string[];
  href: string;
  id: string;
  image: string;
  name: string;
  preview: HTMLAudioElement;
  seconds: number;
  uri: string;
}

export function parseTrack(t: any): Track {
  return {
    artists: t.artists.map((a: Artist) => {
      return {
        id: a.id,
        name: a.name,
      };
    }),
    genres: t.album.genres ?? [],
    href: t.external_urls.spotify,
    id: t.id,
    image: t.album.images[0].url,
    name: t.name,
    preview: new Audio(t.preview_url),
    seconds: Math.round(t.duration_ms / 1000),
    uri: t.uri,
  } as Track;
}

export interface User {
  href: string;
  id: string;
  image: string;
  name: string;
}

export function parseUser(u: any): User {
  return {
    href: u.external_urls.spotify,
    id: u.id,
    image: u.images[0].url,
    name: u.display_name,
  };
}
