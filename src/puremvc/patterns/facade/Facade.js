const Model = require('../../core/Model');
const View = require('../../core/View');
const Controller = require('../../core/Controller');
const Notification = require('../observer/Notification');

let _allowInstantiation = false;
let _instanceMap = new Map();
let _instanceAccess = 'use Facade.getInstance method with key for the multiton instance requested';
let _multitonMessage = 'Facade key for this multitonKey already constructed';

class Facade
{
  constructor(__key)
  {
    if (!Facade._ALLOW_INSTANTIATION)
    {
      throw new Error(Facade._INSTANCE_ACCESS);
    }
    else if (Facade._INSTANCE_MAP.get(__key) != null)
    {
      throw new Error(Facade._MULTITON_MSG);
    }

    this.multitonKey = __key;
    this.model = null;
    this.view = null;
    this.controller = null;

    this.initializeNotifier(__key);
    this.initializeModel();
    this.initializeController();
    this.initializeView();
  };
  static get _ALLOW_INSTANTIATION()
  {
    return _allowInstantiation;
  }
  static set _ALLOW_INSTANTIATION(__value)
  {
    _allowInstantiation = __value;
  }
  static get _INSTANCE_MAP()
  {
    return _instanceMap;
  }
  static get _INSTANCE_ACCESS()
  {
    return _instanceAccess
  }
  static get _MULTITON_MSG()
  {
    return _multitonMessage;
  }

  static getInstance(__key)
  {
    if (__key === null)
      return null;

    if (Facade._INSTANCE_MAP.get(__key) == null)
    {
      Facade._ALLOW_INSTANTIATION = true;
      Facade._INSTANCE_MAP.set(__key, new Facade(__key));
      Facade._ALLOW_INSTANTIATION = false;
    }

    return Facade._INSTANCE_MAP.get(__key);
  };

  static hasCore(__key)
  {
    return Facade._INSTANCE_MAP[__key] !== null;
  };

  static removeCore(__key)
  {
    if (!Facade.hasCore(__key))
      return;
    Model.removeModel(__key);
    View.removeView(__key);
    Controller.removeController(__key);
    let __facade = Facade.getInstance(__key);
    __facade = null;
    Facade._INSTANCE_MAP.set(__key, __facade);

    return __facade;
  };

  initializeModel()
  {
    if (this.model != null)
      return;
    this.model = Model.getInstance(this.multitonKey);
  };

  initializeView()
  {
    if (this.view != null)
      return;
    this.view = View.getInstance(this.multitonKey);
  };

  initializeController()
  {
    if (this.controller != null)
      return;
    this.controller = Controller.getInstance(this.multitonKey);
  };

  registerCommand(__notificationName, __commandClassRef)
  {
    this.controller.registerCommand(__notificationName, __commandClassRef);
  };

  removeCommand(__notificationName)
  {
    this.controller.removeCommand(__notificationName);
  };

  hasCommand(__notificationName)
  {
    return this.controller.hasCommand(__notificationName);
  };

  registerProxy(__proxy)
  {
    this.model.registerProxy(__proxy);
  };

  retrieveProxy(__proxyName)
  {
    return this.model.retrieveProxy(__proxyName);
  };

  removeProxy(__proxyName)
  {
    let __proxy;
    if (this.model && this.hasProxy(__proxyName))
    {
      __proxy = this.removeProxy(__proxyName);
    }
    return __proxy;
  };

  hasProxy(__proxyName)
  {
    return this.model.hasProxy(__proxyName);
  };

  registerMediator(__mediator)
  {
    this.view.registerMediator(__mediator);
  };

  retrieveMediator(__mediatorName)
  {
    return this.view.retrieveMediator(__mediatorName);
  };

  removeMediator(__mediatorName)
  {
    let __mediator;
    if (this.view && this.hasMediator(__mediatorName))
    {
      __mediator = this.removeMediator(__mediatorName);
    }
    return __mediatorName;
  };

  hasMediator(__mediatorName)
  {
    return this.view.hasMediator(__mediatorName);
  };

  sendNotification(__notificationName, __body, __type)
  {
    this.notifyObservers(new Notification(__notificationName, __body, __type));
  };

  notifyObservers(__notification)
  {
    if (this.view !== null)
    {
      this.view.notifyObservers(__notification);
    }
  };

  initializeNotifier(__key)
  {
    this.multitonKey = __key;
  };
};
module.exports = Facade;
