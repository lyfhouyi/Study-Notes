//��Ϊ û��25��Ǯ ��

#pragma once
#include "State.h"

class NoQuarterState : public State
{
public:
	virtual void insertQuarter(GumballMachine * gumballMachine);
	~NoQuarterState();
};

