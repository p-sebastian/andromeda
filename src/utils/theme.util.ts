const main = 'hsla(225, 6%, 13%, 1)';
const sonarrMain = 'hsla(195, 93%, 39%, 1)';
const radarrMain = 'hsla(42, 99%, 53%, 1)';

export const BASE = Object.freeze ({
  fontRegular: 'dank-mono',
  fontItalic: 'dank-mono-italic',
  fontBold: 'fira-code-bold',
  fontColor: main,
  background: main,
  dark: main
});

const SONARR = Object.freeze ({
  ...BASE,
  background: sonarrMain
});

const RADARR = Object.freeze ({
  ...BASE,
  background: radarrMain
});

export const THEME = Object.freeze ({
  SONARR,
  RADARR
});

export type TTheme = typeof BASE;
