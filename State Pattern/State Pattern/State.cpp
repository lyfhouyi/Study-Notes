#include <iostream>
#include "State.h"

using namespace std;

void State::insertQuarter(GumballMachine * gumballMachine)
{
	cout << "´íÎó²Ù×÷£ºinsertQuarter" << endl;
}

void State::ejectQuarter(GumballMachine * gumballMachine)
{
	cout << "´íÎó²Ù×÷£ºejectQuarter" << endl;
}

bool State::turnCrank(GumballMachine * gumballMachine)
{
	cout << "´íÎó²Ù×÷£ºturnCrank" << endl;
	return false;
}

void State::dispense(GumballMachine * gumballMachine)
{
	cout << "´íÎó²Ù×÷£ºdispense" << endl;
}

State::~State()
{
	cout << "~State" << endl;
}
