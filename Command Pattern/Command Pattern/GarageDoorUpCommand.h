//��Ϊ �򿪳��������� ��

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

