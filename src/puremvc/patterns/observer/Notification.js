class Notification
{
  constructor(__name, __body, __type)
  {
    this._name = __name;
    this._body = __body;
    this._type = __type;
  };

  get name()
  {
    return this._name;
  };
  set name(__value)
  {
    this._name = __value;
  };

  get body()
  {
    return this._body;
  };
  set body(__value)
  {
    this._body = __value;
  };

  get type()
  {
    return this._type;
  };
  set type(__value)
  {
    this._type = __value;
  };

  toString()
  {
    let __message = "Notification Name: " + this.name;
    __message += "\nBody:" + ((this.body == null ) ? "null" : this.body.toString());
    __message += "\nType:" + ((this.type == null ) ? "null" : this.type);
    return __message;
  };
};
module.exports = Notification;
