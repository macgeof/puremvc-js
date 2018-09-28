const Facade = require('./puremvc/patterns/facade/Facade');
const Mediator = require('./puremvc/patterns/mediator/Mediator');
const Proxy = require('./puremvc/patterns/proxy/Proxy');
const SimpleCommand = require('./puremvc/patterns/command/SimpleCommand');

const createFacade = function(__key)
{
  const __facade = Facade.getInstance(__key);
  let __mediator = new Mediator(Mediator.NAME, null);
  __facade.registerMediator(__mediator);
  __mediator = new Mediator(`${Mediator.NAME}_2`, null);
  __facade.registerMediator(__mediator);
  const __proxy = new Proxy(Proxy.NAME, {key:'model value'});
  __facade.registerProxy(__proxy);
  __facade.registerCommand('my_command', SimpleCommand);


  return __facade;
};

let __facade1 = createFacade('my_key_1');
const __facade2 = createFacade('my_key_2');
__facade1.sendNotification('my_notification', {key:'note value'}, 'my_type');
__facade1.sendNotification('my_command', {key:'command value'}, 'command_type');
console.log(Facade._INSTANCE_MAP);
__facade1 = Facade.removeCore('my_key_1');
// __facade1.sendNotification('my_notification', {key:'value'}, 'my_type');
console.log('facade removed');
console.log(Facade._INSTANCE_MAP);
__facade1 = createFacade('my_key_3');
console.log('facade added again');
console.log(Facade._INSTANCE_MAP);
__facade1.sendNotification('my_notification', {key:'note value'}, 'my_type');
const __proxy = __facade1.retrieveProxy(Proxy.NAME);
__proxy.doSomething();
