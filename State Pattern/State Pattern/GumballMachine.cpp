#include "GumballMachine.h"
#include "HasQuarterState.h"
#include "NoQuarterState.h"
#include "SoldOutState.h"
#include "SoldState.h"
#include "WinnerState.h"

shared_ptr<State> GumballMachine::soldOutState = shared_ptr<State>(new SoldOutState);
shared_ptr<State> GumballMachine::noQuarterState = shared_ptr<State>(new NoQuarterState);
shared_ptr<State> GumballMachine::hasQuarterState = shared_ptr<State>(new HasQuarterState);
shared_ptr<State> GumballMachine::soldState = shared_ptr<State>(new SoldState);
shared_ptr<State> GumballMachine::winnerState = shared_ptr<State>(new WinnerState);

GumballMachine::GumballMachine(int numberGumballs) :count(numberGumballs)
{
	if (this->count > 0)
		this->curState = noQuarterState;
	else
		this->curState = soldOutState;
}

void GumballMachine::insertQuater()
{
	this->curState->insertQuarter(this);
}

void GumballMachine::ejectQuarter()
{
	this->curState->ejectQuarter(this);
}

void GumballMachine::turnCrank()
{
	if (this->curState->turnCrank(this))
		this->curState->dispense(this);
}

void GumballMachine::setCurState(shared_ptr<State> state)
{
	this->curState = state;
}

void GumballMachine::releaseBall()
{
	cout << this << "来喽！接好糖果！！！" << endl;
	if (this->count != 0)
		this->count--;
}

void GumballMachine::refill(int count)
{
	cout << this << "装填糖果" << endl;
	this->count = count;
	this->curState = this->noQuarterState;
}

int GumballMachine::getCount()
{
	return this->count;
}

shared_ptr<State> GumballMachine::getSoldOutState()
{
	return this->soldOutState;
}

shared_ptr<State> GumballMachine::getNoQuarterState()
{
	return this->noQuarterState;
}

shared_ptr<State> GumballMachine::getHasQuarterState()
{
	return this->hasQuarterState;
}

shared_ptr<State> GumballMachine::getSoldState()
{
	return this->soldState;
}

shared_ptr<State> GumballMachine::getWinnerState()
{
	return this->winnerState;
}
