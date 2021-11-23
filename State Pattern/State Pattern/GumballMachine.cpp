#include <iostream>
#include "GumballMachine.h"

using namespace std;

State *  GumballMachine::soldOutState = new State;
State *  GumballMachine::noQuarterState = new State;
State *  GumballMachine::hasQuarterState = new State;
State *  GumballMachine::soldState = new State;
State *  GumballMachine::winnerState = new State;

GumballMachine::GumballMachine(int numberGumballs):count(numberGumballs)
{
	if (this->count > 0)
		this->curState = noQuarterState;
	else
		this->curState = soldOutState;
}

void GumballMachine::insertQuater()
{
	this->curState->insertQuarter();
}

void GumballMachine::ejectQuarter()
{
	this->curState->ejectQuarter();
}

void GumballMachine::turnCrank()
{
	if (this->curState->turnCrank())
		this->curState->dispense();
}

void GumballMachine::setCurState(State * state)
{
	this->curState = state;
}

void GumballMachine::releaseBall()
{
	cout << "来喽！接好糖果！！！" << endl;
}

int GumballMachine::getCount()
{
	return this->count;
}

State * GumballMachine::getSoldOutState()
{
	return this->soldOutState;
}

State * GumballMachine::getNoQuarterState()
{
	return this->noQuarterState;
}

State * GumballMachine::getHasQuarterState()
{
	return this->hasQuarterState;
}

State * GumballMachine::getSoldState()
{
	return this->soldState;
}

State * GumballMachine::getWinnerState()
{
	return this->winnerState;
}
