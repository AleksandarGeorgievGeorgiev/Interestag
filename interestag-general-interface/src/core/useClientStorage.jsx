import React, { useState, useEffect } from 'react';

const useClientStorage = () => {
  const [currentStorage, setStorage] = useState(() => {
    if(storageAvailable('localStorage')) {
      return window.localStorage;
    } else if(storageAvailable('sessionStorage')) {
      return window.sessionStorage;
    }
  });

  function storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return false;
    }
  }

  const tryStorageOperation = (operation) => {
    if(currentStorage) {
      return operation();
    }
  }

  const saveInStorage = (key, value) => {
    tryStorageOperation(() => currentStorage.setItem(key, JSON.stringify(value)));
  }

  const getFromStorage = (key) => {
    const data = tryStorageOperation(() => currentStorage.getItem(key));
    console.log(data);
    return JSON.parse(data);
  }

  const removeFromStorage = (key) => {
    tryStorageOperation(() => currentStorage.removeItem(key));
  }

  return {
    saveInStorage,
    getFromStorage,
    removeFromStorage,
  }
}

export { useClientStorage };