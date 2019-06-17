export const BASE = Object.freeze ({
  fontRegular: 'dank-mono',
  fontItalic: 'dank-mono-italic',
  fontBold: 'fira-code-bold'
});

const SONARR = Object.freeze ({
  ...BASE,
  background: 'blue'
});

const RADARR = Object.freeze ({
  ...BASE,
  background: 'yellow'
});

export const THEME = Object.freeze ({
  SONARR,
  RADARR
});

export type TTheme = typeof BASE;
