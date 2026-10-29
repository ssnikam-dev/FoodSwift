const fs = require('fs');
const base = (process.env.API_URL || '').replace(/\/+$/, '');
if (!/^https:\/\//.test(base)) {
  console.error('API_URL must be set to an https:// URL, e.g. https://api.example.com');
  process.exit(1);
}
const out = `export const API_URL_RL = '${base}';
export const API_URL_Order = '${base}';
export const API_URL_FC = '${base}';
export const API_URL_UD = '${base}';
`;
fs.writeFileSync('src/app/constants/url.ts', out);
console.log('Wrote src/app/constants/url.ts for', base);