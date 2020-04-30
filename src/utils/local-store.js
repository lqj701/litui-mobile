class LocalStore {
  constructor(opts = {}) {
    this.opts = opts;
  }

  set(key, val) {
    try {
      window.localStorage.setItem(this.realKey(key), JSON.stringify(val));
    } catch (oException) {
      if (oException.name === 'QuotaExceededError') {
        window.localStorage.clear();
        window.localStorage.setItem(this.realKey(key), JSON.stringify(val));
      }
    }
  }

  get(key, defaultVal) {
    const result = window.localStorage.getItem(this.realKey(key));
    return result ? JSON.parse(result) : defaultVal;
  }

  remove(key) {
    window.localStorage.removeItem(this.realKey(key));
  }

  clear() {
    window.localStorage.clear();
  }

  realKey(key) {
    let result = `IK.${key}`;

    if (this.opts.affix) {
      result += `_${this.opts.affix}`;
    }

    return result;
  }
}

export default LocalStore;
