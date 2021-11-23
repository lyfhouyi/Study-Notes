//此为 没有25分钱 类

#pragma once
#include "State.h"

class NoQuarterState : public State
{
public:
	virtual void insertQuarter(GumballMachine * gumballMachine);
	~NoQuarterState();
};

