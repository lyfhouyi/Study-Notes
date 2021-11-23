#include <iostream>
#include <ctime>
#include "HasQuarterState.h"

using namespace std;

void HasQuarterState::ejectQuarter(GumballMachine * gumballMachine)
{
	cout << gumballMachine << "退回25分钱" << endl;
	gumballMachine->setCurState(gumballMachine->getNoQuarterState());
}

bool HasQuarterState::turnCrank(GumballMachine * gumballMachine)
{
	srand((int)time(0));
	int num = rand() % 100;
	if (num < 50)
	{
		cout << gumballMachine << "转动曲柄中奖了" << endl;
		gumballMachine->setCurState(gumballMachine->getWinnerState());
	}
	else
	{
		cout << gumballMachine << "转动曲柄未中奖" << endl;
		gumballMachine->setCurState(gumballMachine->getSoldState());
	}
	return true;
}

HasQuarterState::~HasQuarterState()
{
	cout << "~HasQuarterState" << endl;
}
