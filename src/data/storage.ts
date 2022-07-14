import { IStorage } from './storage.model';

export const storage: IStorage = {
  users: [
    {
      id: 'b08da03b-2bb1-4977-9aca-6ef9a8298912',
      login: 'qwe',
      password: 'qwe',
      version: 1,
      createdAt: 1657636183020,
      updatedAt: 1657636183020,
    },
    {
      id: '9cd8a1be-829f-4154-b46b-19e966a2b198',
      login: 'qwe',
      password: 'qwe',
      version: 1,
      createdAt: 1657636183711,
      updatedAt: 1657636183711,
    },
    {
      id: '4f89d00b-07f4-42ec-959b-856fa264f95e',
      login: 'qwe',
      password: 'qwe',
      version: 1,
      createdAt: 1657636184336,
      updatedAt: 1657636184336,
    },
    {
      id: '0abec08c-66f2-47a9-8b70-04ad33ef3798',
      login: 'qwe',
      password: 'qwe',
      version: 1,
      createdAt: 1657636422310,
      updatedAt: 1657636422310,
    },
  ],
  tracks: [
    {
      id: '0bf5202e-6590-44d1-bb36-e87095af7df6',
      name: 'track1',
      duration: 123123,
      albumId: null,
      artistId: null,
    },
    {
      id: '13bbe807-c639-4539-949e-57884be8c05c',
      name: 'track2',
      duration: 123123,
      albumId: null,
      artistId: null,
    },
    {
      id: 'a50eed29-bd82-4903-8691-1600f83ef2bd',
      name: 'track3',
      duration: 123123,
      albumId: null,
      artistId: null,
    },
    {
      id: 'cdb38f9c-4c64-4361-a098-e41a47034c27',
      name: 'track4',
      duration: 123123,
      albumId: null,
      artistId: null,
    },
  ],
  artists: [
    {
      id: 'beee2200-3567-4bfd-88b8-710f13b04c9c',
      name: 'artist1',
      grammy: false,
    },
    {
      id: '34abd297-d5b2-41c2-ac8c-9b1af80868d4',
      name: 'artist2',
      grammy: false,
    },
    {
      id: '5d377481-8955-4a30-a681-fbab55b702a3',
      name: 'artist3',
      grammy: true,
    },
    {
      id: 'c841c954-2e41-4e55-b623-dd51fd45f767',
      name: 'artist4',
      grammy: false,
    },
  ],
  albums: [
    {
      id: '76e53790-ccf5-48ff-97cd-809f43eb585f',
      name: 'album1',
      year: 2014,
      artistId: null,
    },
    {
      id: 'b262de0a-91b3-49cd-ba20-29e27d2af903',
      name: 'album2',
      year: 2014,
      artistId: null,
    },
    {
      id: '94a87abf-5174-4241-a24e-af5fb2227629',
      name: 'album3',
      year: 2014,
      artistId: null,
    },
    {
      id: 'fa2b8e5b-5def-485f-8beb-8d78606016ee',
      name: 'album4',
      year: 2014,
      artistId: null,
    },
  ],
};
