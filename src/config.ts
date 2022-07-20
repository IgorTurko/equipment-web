interface Config {
  [propName: string]: string;
}

interface MyWindow extends Window {
  env: Config;
}

declare let window: MyWindow;

if (!window || !window.env) {
  // Placeholders for `window.env` in case those aren't defined. This
  // would make it slightly easier for our tests to distinguish whether
  // correct API endpoints were called.
  window.env = {
    API_URL: 'https://fake-api-url.dev',
  };
}

export const API_URL = window?.env?.API_URL;
