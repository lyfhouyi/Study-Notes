//此为 售出糖果 类

#pragma once
#include "State.h"

class SoldState : public State
{
public:
	virtual void dispense(GumballMachine * gumballMachine);
	~SoldState();
};

