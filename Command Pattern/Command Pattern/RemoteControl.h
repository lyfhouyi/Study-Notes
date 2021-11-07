//´ËÎª Ò£¿ØÆ÷ Àà

#pragma once
#include <vector>
#include "Command.h"
#include "NoCommand.h"

using namespace std;

class RemoteControl
{
private:
	vector<Command *> onCommands;
	vector<Command *> offCommands;
	Command * lastCommand;
	Command * noCommand;

public:
	RemoteControl();
	~RemoteControl();
	void setCommand(int slot, Command * onCommand, Command * offCommand);
	void onButtonWasPushed(int slot);
	void offButtonWasPushed(int slot);
	void undoButtonWasPushed();
};