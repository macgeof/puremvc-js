import Notifier from '../observer/Notifier';

export default class MacroCommand extends Notifier
{
  constructor()
  {
    super();
    this._subCommands = [];
  };

  initializeMacroCommand()
  {

  };

  addSubCommand(__commandClassRef)
  {
    this._subCommands.push(__commandClassRef);
  }

  execute(__notification)
  {
    while (this._subCommands.length > 0)
    {
      let __ref = this._subCommands.shift();
      let __command = new __ref();
      __command.initializeNotifier(this.multitonKey);
      __command.execute(__notification);
    }
  };
};
