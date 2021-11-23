#include <iostream>
#include "NoQuarterState.h"

using namespace std;

void NoQuarterState::insertQuarter(GumballMachine * gumballMachine)
{
	cout << gumballMachine << "Í¶Èë25·ÖÇ®" << endl;
	gumballMachine->setCurState(gumballMachine->getHasQuarterState());
}

NoQuarterState::~NoQuarterState()
{
	cout << "~NoQuarterState" << endl;
}
