import { findGetParameter } from '@ktsstudio/mediaproject-utils';

/*
* Checks if app is not VK App by searching vk_app_id GET parameter
* @returns {boolean} Check result
*/
export default (): boolean => {
  window.is_ok = !findGetParameter('vk_app_id');

  return window.is_ok;
};
