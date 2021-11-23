//此为 赢家 类

#pragma once
#include "State.h"

class WinnerState : public State
{
public:
	virtual void dispense(GumballMachine * gumballMachine);
	~WinnerState();
};

