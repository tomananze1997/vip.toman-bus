const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
require('dotenv').config({ path: '.env' });

const siteUrl = (process.env.SITE_URL || 'https://vip.toman-bus.si').trim();
const redirectLink = (process.env.REDIRECT_LINK || 'https://www.toman-bus.si').trim();
const emailServiceId = process.env.EMAIL_SERVICE_ID;
const emailTemplateId = process.env.EMAIL_TEMPLATE_ID;
const emailPublicKey = process.env.EMAIL_PUBLIC_KEY;

const envFile = `import { IEnvironment } from '@interfaces';

export const environment: IEnvironment = {
  siteUrl: ${JSON.stringify(siteUrl)},
  REDIRECT_LINK: ${JSON.stringify(redirectLink)},
  EMAIL_SERVICE_ID: ${JSON.stringify(emailServiceId)},
  EMAIL_TEMPLATE_ID: ${JSON.stringify(emailTemplateId)},
  EMAIL_PUBLIC_KEY: ${JSON.stringify(emailPublicKey)}
};
`;
const targetPath = path.join(__dirname, './src/app/environments/environments.ts');
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});
