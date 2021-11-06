//此为 关闭车库门命令 类

#pragma once
#include "Command.h"
#include "GarageDoor.h"

class GarageDoorDownCommand :public Command
{
private:
	GarageDoor *garageDoor;
public:
	GarageDoorDownCommand(GarageDoor *garageDoor);
	virtual void execute();
	virtual void undo();
};

