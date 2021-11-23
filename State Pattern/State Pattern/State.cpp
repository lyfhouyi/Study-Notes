#include <iostream>
#include "State.h"

using namespace std;

void State::insertQuarter()
{
	cout << "´íÎó²Ù×÷£ºinsertQuarter" << endl;
}

void State::ejectQuarter()
{
	cout << "´íÎó²Ù×÷£ºejectQuarter" << endl;
}

bool State::turnCrank()
{
	cout << "´íÎó²Ù×÷£ºturnCrank" << endl;
	return false;
}

void State::dispense()
{
	cout << "´íÎó²Ù×÷£ºdispense" << endl;
}

State::~State()
{
	cout << "~State" << endl;
}
