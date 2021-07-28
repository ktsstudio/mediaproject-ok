/*
 * Method to check current platform is IOS.
 * Sets Window.is_ios = true and adds classname 'ios' for document.body if matches
 * @param {string} platform Taken from OK current platform. Taken from Window by default
 * @returns {boolean} Returns true if matches
 */
export default (platform = window.platform): boolean => {
  if (
    window.platform === 'iosweb' ||
    window.platform === 'ios' ||
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
  ) {
    window.is_ios = true;

    document.body.classList.add('ios');

    return true;
  }

  return false;
};
