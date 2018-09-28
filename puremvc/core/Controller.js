const View = require('./View');
const Observer = require('../patterns/observer/Observer');

let _allowInstantiation = false;
let _instanceMap = new Map();
let _instanceAccess = 'use Controller.getInstance method with key for the multiton instance requested';
let _multitonMessage = 'Controller key for this multitonKey already constructed';

class Controller
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
    if (__key == null)
      return null;

    if (Controller._INSTANCE_MAP.get(__key) == null)
    {
      Controller._ALLOW_INSTANTIATION = true;
      Controller._INSTANCE_MAP.set(__key, new Controller(__key));
      Controller._ALLOW_INSTANTIATION = false;
    }

    return Controller._INSTANCE_MAP.get(__key);
  };

  static removeController(__key)
  {
    Controller._INSTANCE_MAP.set(__key, null);
  };

  constructor(__key)
  {
    if (!Controller._ALLOW_INSTANTIATION)
    {
      throw new Error(Controller._INSTANCE_ACCESS);
    }
    else if (Controller._INSTANCE_MAP.get(__key) != null)
    {
      throw new Error(Controller._MULTITON_MSG);
    }

    this.multitonKey = __key;
    this.view = null;
    this.commandMap = [];
    this.initializeController();
  };

  initializeController()
  {
    this.view = View.getInstance(this.multitonKey);
  };

  executeCommand(__note)
  {
    let __commandClassRef = this.commandMap[__note.name];
    if (__commandClassRef === null)
      return;

    let __commandInstance = new __commandClassRef();
    __commandInstance.initializeNotifier(this.multitonKey);
    __commandInstance.execute(__note);
  };

  registerCommand(__notificationName, __commandClassRef)
  {
    if (this.commandMap[__notificationName] == null)
    {
      this.view.registerObserver(__notificationName, new Observer(this.executeCommand, this));
    }
    this.commandMap[__notificationName] = __commandClassRef;
  };

  hasCommand(__notificationName)
  {
    return this.commandMap[__notificationName] !== null;
  };

  removeCommand(__notificationName)
  {
    if (this.hasCommand(__notificationName))
    {
      this.view.removeObserver(__notificationName, this);
      this.commandMap[__notificationName] = null;
    }
  };
};
module.exports = Controller;
