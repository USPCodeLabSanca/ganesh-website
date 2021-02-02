const axios = require('axios');

const RESPONSES = {
  SUCCESS: 1,
  WRONG_TOKEN: 0,
  SERVER_ERROR: -1,
}

const validateCaptcha = async (key, token) => {
  const captchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${token}`;
  
  try {
    const captchaResult = await axios.post(captchaURL, {});

    if (!captchaResult.data.success) {
      // User sent the wrong captcha token
      return RESPONSES.WRONG_TOKEN;
    }
  } catch (err) {
    console.error(err);
    return RESPONSES.SERVER_ERROR;
  }

  return RESPONSES.SUCCESS;
}

module.exports = {RESPONSES, validateCaptcha};
