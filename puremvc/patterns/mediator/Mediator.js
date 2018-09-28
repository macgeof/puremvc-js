const Notifier = require('../observer/Notifier');

class Mediator extends Notifier
{
  static get NAME() { return 'Mediator'; };

  constructor(__mediatorName, __viewComponent)
  {
    super();
    this._mediatorName = __mediatorName;
    this._viewComponent = __viewComponent;
  };

  getMediatorName()
  {
    return this._mediatorName;
  };

  setViewComponent(__viewComponent)
  {
    this._viewComponent = __viewComponent;
  };

  getViewComponent()
  {
    return this._viewComponent;
  };

  listNotificationInterests()
  {
    return ['my_notification','proxy_notification'];
  };

  handleNotification(__notification)
  {
    if (__notification.name === 'my_notification' || __notification.name === 'proxy_notification')
      console.log(this.multitonKey, ` facade handling notification ${__notification.name} : body = ${JSON.stringify(__notification.body, undefined, 2)} : type = ${__notification.type}`);
    return;
  };

  onRegister()
  {
    return;
  };

  onRemove()
  {
    return;
  }
};
module.exports = Mediator;
