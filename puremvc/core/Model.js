let _allowInstantiation = false;
let _instanceMap = new Map();
let _instanceAccess = 'use Model.getInstance method with key for the multiton instance requested';
let _multitonMessage = 'Model key for this multitonKey already constructed';

class Model
{
  static get _ALLOW_INSTANTIATION()
  {
    return _allowInstantiation;
  };
  static set _ALLOW_INSTANTIATION(__value)
  {
    _allowInstantiation = __value;
  };
  static get _INSTANCE_MAP()
  {
    return _instanceMap;
  };
  static get _INSTANCE_ACCESS()
  {
    return _instanceAccess
  };
  static get _MULTITON_MSG()
  {
    return _multitonMessage;
  };
  static getInstance(__key)
  {
    if (__key === null)
      return null;

    if (Model._INSTANCE_MAP.get(__key) == null)
    {
      Model._ALLOW_INSTANTIATION = true;
      Model._INSTANCE_MAP.set(__key, new Model(__key));
      Model._ALLOW_INSTANTIATION = false;
    }

    return Model._INSTANCE_MAP.get(__key);
  };

  static removeController(__key)
  {
    Controller._INSTANCE_MAP.set(__key, null);
  };

  constructor(__key)
  {
    if (!Model._ALLOW_INSTANTIATION)
    {
      throw new Error(Model._INSTANCE_ACCESS);
    }
    else if (Model._INSTANCE_MAP.get(__key) != null)
    {
      throw new Error(Model._MULTITON_MSG);
    }

    this.multitonKey = __key;
    this.proxyMap = [];
    this.initializeModel();
  };

  initializeModel()
  {
  };

  registerProxy(__proxy)
  {
    let __proxyName = __proxy.getProxyName();
    if (this.proxyMap[__proxyName] == null)
    {
      this.removeProxy(__proxyName);
    }
      __proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[__proxy.getProxyName()] = __proxy;
    __proxy.onRegister();
  };

  hasProxy(__proxyName)
  {
    return this.proxyMap[__proxyName] != null;
  };

  removeProxy(__proxyName)
  {
    let __proxy;
    if (this.hasProxy(__proxyName))
    {
      __proxy = this.proxyMap[__proxyName];
      this.proxyMap[__proxyName] = null;
      __proxy.onRemove();
    }
    return __proxy;
  };

  retrieveProxy(__proxyName)
  {
    return this.proxyMap[__proxyName];
  }

  static removeModel(__key)
  {
    Model._INSTANCE_MAP.set(__key, null);
  };
};
module.exports = Model;
