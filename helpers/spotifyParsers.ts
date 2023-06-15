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
  const preview = new Audio(t.preview_url);

  preview.loop = true;

  return {
    artists: t.artists.map((a: any) => {
      return {
        id: a.id,
        name: a.name,
      };
    }),
    genres: t.album.genres ?? [],
    href: t.external_urls.spotify,
    id: t.id,
    image: t.album.images[0]?.url ?? '/spotify/music.svg',
    name: t.name,
    preview: preview,
    seconds: Math.round(t.duration_ms / 1000),
    uri: t.uri,
  } as Track;
}

export function parseTracks(t: any): Track[] {
  if (!t) {
    return [];
  }

  // preview url can be null, but audio is essential here so need to filter these results
  // https://github.com/spotify/web-api/issues/148#issuecomment-313924088
  return t.filter((t: any) => !!t.preview_url)
    .map((t: any) => parseTrack(t));
}

export interface User {
  href: string;
  id: string;
  image: string;
  name: string;
}

export function parseUser(u: any): User | null {
  if (!u) {
    return null;
  }

  return {
    href: u.external_urls.spotify,
    id: u.id,
    image: u.images[0]?.url ?? '/spotify/user.svg',
    name: u.display_name,
  };
}
