#include <iostream>
#include "WinnerState.h"

using namespace std;

void WinnerState::dispense(GumballMachine * gumballMachine)
{
	cout << gumballMachine << "�н��ˣ�" << endl;
	gumballMachine->releaseBall();
	if (gumballMachine->getCount() == 0)
	{
		cout << gumballMachine << "�ǹ�������" << endl;
		gumballMachine->setCurState(gumballMachine->getSoldOutState());
	}
	else
	{
		gumballMachine->releaseBall();
		if (gumballMachine->getCount() > 0)
			gumballMachine->setCurState(gumballMachine->getNoQuarterState());
		else
		{
			cout << gumballMachine << "�ǹ�������" << endl;
			gumballMachine->setCurState(gumballMachine->getSoldOutState());
		}
	}
}

WinnerState::~WinnerState()
{
	cout << "~WinnerState" << endl;
}
