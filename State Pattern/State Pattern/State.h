//��Ϊ ״̬ ����

#pragma once
#include "GumballMachine.h"

class GumballMachine;

class State
{
public:
	virtual void insertQuarter(GumballMachine * gumballMachine);
	virtual void ejectQuarter(GumballMachine * gumballMachine);
	virtual bool turnCrank(GumballMachine * gumballMachine);
	virtual void dispense(GumballMachine * gumballMachine);
	virtual ~State();
};

