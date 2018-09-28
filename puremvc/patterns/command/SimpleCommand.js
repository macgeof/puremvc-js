const Notifier = require('../observer/Notifier');

class SimpleCommand extends Notifier
{
  constructor()
  {
    super();
  };

  execute(__notification)
  {
    console.log(this.multitonKey, ' facade executing command', __notification);
  };
};
module.exports = SimpleCommand;
