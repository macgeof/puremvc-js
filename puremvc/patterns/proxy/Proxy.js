const Notifier = require('../observer/Notifier');

class Proxy extends Notifier
{
  static get NAME() { return 'Proxy'; };

  constructor(__proxyName, __data)
  {
    super();
    this._data;
    this._proxyName = __proxyName;
    if (__data !== null)
    {
      this.setData(__data);
    }
  };

  getProxyName()
  {
    return this._proxyName;
  };

  setData(__data)
  {
    this._data = __data;
  };

  getData()
  {
    return this._data;
  };

  onRegister()
  {
    return;
  };

  onRemove()
  {
    return;
  }

  doSomething()
  {
    this.sendNotification('proxy_notification', this._data, 'something from proxy');
  }
};
module.exports = Proxy;
