import 'dotenv/config';

export const config = {
  USERNAME: process.env.U_NAME || '',
  PASS: process.env.PASS || '',
  FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN || '',
  M_USER: process.env.M_USER || '',
  M_PASS: process.env.M_PASS || '',
  M_URL: process.env.M_URL || '',
  S_URL: process.env.S_URL || '',
  URL: process.env.URL || '',
};
