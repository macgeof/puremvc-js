const Facade = require('../facade/Facade');

class Notifier
{
  constructor()
  {
    this._facade;
    this.multitonKey;
  };

  sendNotification(__notificationName, __body, __type)
  {
    let __facade = this.getFacade();
    if (__facade)
    {
      __facade.sendNotification(__notificationName, __body, __type);
    }
  };

  initializeNotifier(__key)
  {
    this.multitonKey = __key;
    this._facade = this.getFacade();
  }

  getFacade()
  {
    if (this.multitonKey === null)
    {
      throw new Error(Notifier._MULTITON_MSG);
    }

    return Facade.getInstance(this.multitonKey);
  }
};
module.exports = Notifier
