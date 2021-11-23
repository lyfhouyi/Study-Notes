#include <iostream>
#include <ctime>
#include "HasQuarterState.h"

using namespace std;

void HasQuarterState::ejectQuarter(GumballMachine * gumballMachine)
{
	cout << gumballMachine << "�˻�25��Ǯ" << endl;
	gumballMachine->setCurState(gumballMachine->getNoQuarterState());
}

bool HasQuarterState::turnCrank(GumballMachine * gumballMachine)
{
	srand((int)time(0));
	int num = rand() % 100;
	if (num < 50)
	{
		cout << gumballMachine << "ת�������н���" << endl;
		gumballMachine->setCurState(gumballMachine->getWinnerState());
	}
	else
	{
		cout << gumballMachine << "ת������δ�н�" << endl;
		gumballMachine->setCurState(gumballMachine->getSoldState());
	}
	return true;
}

HasQuarterState::~HasQuarterState()
{
	cout << "~HasQuarterState" << endl;
}
