//��Ϊ �۳��ǹ� ��

#pragma once
#include "State.h"

class SoldState : public State
{
public:
	virtual void dispense(GumballMachine * gumballMachine);
	~SoldState();
};

