import { initializeAppParams } from '@ktsstudio/mediaproject-utils';

import checkIOS from './checkIOS';

/*
 * Method to initialize OK App. Takes params from FAPI method getRequestParameters.
 * Firstly initializes common params. Adds 'ok' classname to document.body. Sends init to FAPI
 */
export default () => {
  initializeAppParams();

  const params = window.FAPI.Util.getRequestParameters();

  window.app_id = params.apiconnection.split('_')[0];
  window.api_server = params.api_server;
  window.apiconnection = params.apiconnection;
  window.user_id = params.logged_user_id;
  window.is_mobile = params.mob;
  window.platform = params.mob_platform || 'desktop_web';

  window.is_mobile
    ? document.body.classList.add('mobile')
    : document.body.classList.remove('mobile');

  checkIOS();

  document.body.classList.add('ok');

  window.FAPI.init(window.api_server, window.apiconnection);

  console.log(`OK, ${window.is_mobile ? 'mobile, ' : ''}${window.platform}`);
};
