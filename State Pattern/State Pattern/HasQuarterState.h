//��Ϊ ��25��Ǯ ��

#pragma once
#include "State.h"

class HasQuarterState : public State
{
public:
	virtual void ejectQuarter(GumballMachine * gumballMachine);
	virtual bool turnCrank(GumballMachine * gumballMachine);
	~HasQuarterState();
};
