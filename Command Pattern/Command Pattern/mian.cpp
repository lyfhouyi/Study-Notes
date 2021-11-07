#include <iostream>
#include "Commonds.h"
#include "RemoteControl.h"

using namespace std;

int main()
{
	RemoteControl remoteControl;

	Light light;
	GarageDoor garageDoor;

	LightOnCommand lightOnCommand(&light);
	LightOffCommand lightOffCommand(&light);
	GarageDoorUpCommand garageDoorUpCommand(&garageDoor);
	GarageDoorDownCommand garageDoorDownCommand(&garageDoor);

	//remoteControl.setCommand(0, &lightOnCommand, &lightOffCommand);
	//remoteControl.setCommand(1, &garageDoorUpCommand, &garageDoorDownCommand);

	//remoteControl.onButtonWasPushed(0);
	//remoteControl.onButtonWasPushed(1);
	//remoteControl.offButtonWasPushed(0);
	//remoteControl.offButtonWasPushed(1);

	//remoteControl.undoButtonWasPushed();
	//remoteControl.undoButtonWasPushed();

	vector<Command *> partyOn;
	partyOn.push_back(&lightOnCommand);
	partyOn.push_back(&garageDoorUpCommand);
	MacroCommand partyOnMacro(partyOn);

	vector<Command *> partyOff;
	partyOff.push_back(&lightOffCommand);
	partyOff.push_back(&garageDoorDownCommand);
	MacroCommand partyOffMacro(partyOff);

	remoteControl.setCommand(0, &partyOnMacro, &partyOffMacro);
	cout << "派对开始" << endl;
	remoteControl.onButtonWasPushed(0);
	cout << "派对结束" << endl;
	remoteControl.offButtonWasPushed(0);
	remoteControl.undoButtonWasPushed();

	return 0;
}