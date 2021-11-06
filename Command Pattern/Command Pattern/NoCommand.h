//´ËÎª ¿ÕÃüÁî Àà

#pragma once
#include "Command.h"
class NoCommand :public Command
{
public:
	virtual void execute() {}
	virtual void undo() {}
};

