#include <iostream>
#include "SoldState.h"

using namespace std;

void SoldState::dispense(GumballMachine * gumballMachine)
{
	gumballMachine->releaseBall();
	if (gumballMachine->getCount() > 0)
		gumballMachine->setCurState(gumballMachine->getNoQuarterState());
	else
	{
		cout << gumballMachine << "ÌÇ¹ûÊÛóÀ£¡" << endl;
		gumballMachine->setCurState(gumballMachine->getSoldOutState());
	}
}

SoldState::~SoldState()
{
	cout << "~SoldState" << endl;
}
