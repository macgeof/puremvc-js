const Observer = require('../patterns/observer/Observer');

let _allowInstantiation = false;
let _instanceMap = new Map();
let _instanceAccess = 'use View.getInstance method with key for the multiton instance requested';
let _multitonMessage = 'View key for this multitonKey already constructed';

class View
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
  static getInstance (__key)
  {
    if (__key === null)
      return null;

    if (View._INSTANCE_MAP.get(__key) == null)
    {
      View._ALLOW_INSTANTIATION = true;
      View._INSTANCE_MAP.set(__key, new View(__key));
      View._ALLOW_INSTANTIATION = false;
    }

    return View._INSTANCE_MAP.get(__key);
  }

  constructor(__key)
  {
    if (!View._ALLOW_INSTANTIATION)
    {
      throw new Error(View._INSTANCE_ACCESS);
    }
    else if (View._INSTANCE_MAP.get(__key) != null)
    {
      throw new Error(View._MULTITON_MSG);
    }

    this.multitonKey = __key;
    this.mediatorMap = [];
    this.observerMap = [];
  };

  initializeView()
  {
    return;
  };

  registerObserver(__notificationName, __observer)
  {
    if (this.observerMap[__notificationName] != null)
    {
      this.observerMap[__notificationName].push(__observer);
    }
    else
    {
      this.observerMap[__notificationName] = [__observer];
    }
  };

  notifyObservers(__notification)
  {
    if (this.observerMap[__notification.name] != null)
    {
        let __observers_ref = this.observerMap[__notification.name], __observers = [], __observer

        for(let __i = 0; __i < __observers_ref.length; __i++)
        {
            __observer = __observers_ref[__i];
            __observers.push(__observer);
        }

        for(var __i = 0; __i < __observers.length; __i++)
        {
            __observer = __observers[__i];
            __observer.notifyObserver(__notification);
        }
    }
  };

  removeObserver(__notificationName, __notifyContext)
  {
      // SIC
      let __observers = this.observerMap[__notificationName];
      for(let __i = 0; __i < __observers.length; __i++)
      {
          if(__observers[__i].compareNotifyContext(__notifyContext) === true)
          {
              __observers.splice(i, 1);
              break;
          }
      }

      if(__observers.length === 0)
      {
          delete this.observerMap[__notificationName];
      }
  };

  registerMediator(__mediator)
  {
      if(this.mediatorMap[__mediator.getMediatorName()] != null)
      {
          return;
      }

      __mediator.initializeNotifier(this.multitonKey);
      // register the mediator for retrieval by name
      this.mediatorMap[__mediator.getMediatorName()] = __mediator;

      // get notification interests if any
      let __interests = __mediator.listNotificationInterests();

      // register mediator as an observer for each notification
      if(__interests.length > 0)
      {
          // create observer referencing this mediators handleNotification method
          let __observer = new Observer(__mediator.handleNotification, __mediator);
          for(let __i = 0; __i < __interests.length; __i++)
          {
              this.registerObserver(__interests[__i], __observer);
          }
      }

      __mediator.onRegister();
  };

  retrieveMediator(__mediatorName)
  {
      return this.mediatorMap[__mediatorName];
  };

  removeMediator(__mediatorName)
  {
      let __mediator = this.mediatorMap[__mediatorName];
      if(__mediator)
      {
          // for every notification the mediator is interested in...
          let __interests = __mediator.listNotificationInterests();
          for(let __i = 0; __i < __interests.length; __i++)
          {
              // remove the observer linking the mediator to the notification
              // interest
              this.removeObserver(__interests[__i], __mediator);
          }

          // remove the mediator from the map
          delete this.mediatorMap[__mediatorName];

          // alert the mediator that it has been removed
          __mediator.onRemove();
      }

      return __mediator;
  };

  hasMediator(__mediatorName)
  {
      return this.mediatorMap[__mediatorName] !== null;
  };

  static removeView(__key)
  {
    View._INSTANCE_MAP.set(__key, null);
  };
};
module.exports = View;
