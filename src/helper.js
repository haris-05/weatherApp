import {Toast} from 'native-base';
const helper = {
  successToast(message, duration = 3000) {
    Toast.show({
      text: message,
      duration: duration,
      type: 'success',
    });
  },
  errorToast(message) {
    Toast.show({
      text: message,
      duration: 3000,
      type: 'danger',
    });
  },
  internetToast(message) {
    Toast.show({
      text: message,
      duration: 3000,
      type: 'warning',
    });
  },
  capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  },
};

module.exports = helper;
