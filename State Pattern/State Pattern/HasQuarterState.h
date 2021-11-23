//此为 有25分钱 类

#pragma once
#include "State.h"

class HasQuarterState : public State
{
public:
	virtual void ejectQuarter(GumballMachine * gumballMachine);
	virtual bool turnCrank(GumballMachine * gumballMachine);
	~HasQuarterState();
};
