class Observer
{
  constructor(__notifyMethod, __notifyContext)
  {
    this._notify;
    this._context;
    this._setNotifyMethod(__notifyMethod);
    this._setNotifyContext(__notifyContext);
  }

  _setNotifyMethod(__notifyMethod)
  {
    this._notify = __notifyMethod;
  };

  _setNotifyContext(__notifyContext)
  {
    this._context = __notifyContext;
  };

  getNotifyMethod()
  {
    return this._notify;
  };

  getNotifyContext()
  {
    return this._context;
  };

  notifyObserver(__notification)
  {
    this.getNotifyMethod().call(this.getNotifyContext(), __notification);
  }

  compareNotifyContext(__object)
  {
    return __object === this._context;
  };
};
module.exports = Observer;
