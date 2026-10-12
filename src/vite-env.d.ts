/// <reference types="vite/client" />

interface AndoReady {
  ready: boolean;
  seed: string;
}

interface Window {
  __ANDO__?: AndoReady;
}
