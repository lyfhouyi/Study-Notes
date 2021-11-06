//此为 打开车库门命令 类

#pragma once
#include "Command.h"
#include "GarageDoor.h"

class GarageDoorUpCommand :public Command
{
private:
	GarageDoor *garageDoor;
public:
	GarageDoorUpCommand(GarageDoor *garageDoor);
	virtual void execute();
	virtual void undo();
};

