#include <iostream>
#include "NoQuarterState.h"

using namespace std;

void NoQuarterState::insertQuarter(GumballMachine * gumballMachine)
{
	cout << gumballMachine << "Ͷ��25��Ǯ" << endl;
	gumballMachine->setCurState(gumballMachine->getHasQuarterState());
}

NoQuarterState::~NoQuarterState()
{
	cout << "~NoQuarterState" << endl;
}
