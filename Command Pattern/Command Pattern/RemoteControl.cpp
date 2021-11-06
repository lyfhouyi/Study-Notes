#include <iostream>
#include "RemoteControl.h"

using namespace std;

RemoteControl::RemoteControl()
{
	this->noCommand = new NoCommand;
	for (int i = 0; i < 7; i++)
	{
		this->onCommands.push_back(this->noCommand);
		this->offCommands.push_back(this->noCommand);
	}
	lastCommand = noCommand;
}

RemoteControl::~RemoteControl()
{
	delete this->noCommand;
}

void RemoteControl::setCommand(int slot, Command * onCommand, Command * offCommand)
{

	this->onCommands[slot] = onCommand;
	this->offCommands[slot] = offCommand;
}

void RemoteControl::onButtonWasPushed(int slot)
{
	this->onCommands[slot]->execute();
	this->lastCommand = this->onCommands[slot];
}

void RemoteControl::offButtonWasPushed(int slot)
{
	this->offCommands[slot]->execute();
	this->lastCommand = this->offCommands[slot];
}

void RemoteControl::undoButtonWasPushed()
{
	this->lastCommand->undo();
}

