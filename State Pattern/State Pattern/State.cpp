#include <iostream>
#include "State.h"

using namespace std;

void State::insertQuarter()
{
	cout << "���������insertQuarter" << endl;
}

void State::ejectQuarter()
{
	cout << "���������ejectQuarter" << endl;
}

bool State::turnCrank()
{
	cout << "���������turnCrank" << endl;
	return false;
}

void State::dispense()
{
	cout << "���������dispense" << endl;
}

State::~State()
{
	cout << "~State" << endl;
}
