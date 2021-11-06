//´ËÎª ºêÃüÁî Àà

#pragma once
#include <vector>
#include "Command.h"

using namespace std;

class MacroCommand :public Command
{
private:
	vector<Command *> commands;
public:
	MacroCommand(vector<Command *>& commands);
	virtual void execute();
	virtual void undo();
};

