#include <iostream>
#include "State.h"

using namespace std;

void State::insertQuarter(GumballMachine * gumballMachine)
{
	cout << "���������insertQuarter" << endl;
}

void State::ejectQuarter(GumballMachine * gumballMachine)
{
	cout << "���������ejectQuarter" << endl;
}

bool State::turnCrank(GumballMachine * gumballMachine)
{
	cout << "���������turnCrank" << endl;
	return false;
}

void State::dispense(GumballMachine * gumballMachine)
{
	cout << "���������dispense" << endl;
}

State::~State()
{
	cout << "~State" << endl;
}
