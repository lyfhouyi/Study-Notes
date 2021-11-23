//此为 糖果机 类

#pragma once
#include "State.h"

class GumballMachine
{
private:
	static State * soldOutState;
	static State * noQuarterState;
	static State * hasQuarterState;
	static State * soldState;
	static State * winnerState;

	State * curState;
	int count;
public:
	GumballMachine(int numberGumballs);
	void insertQuater();
	void ejectQuarter();
	void turnCrank();
	void setCurState(State * state);
	void releaseBall();

	int getCount();
	State * getSoldOutState();
	State * getNoQuarterState();
	State * getHasQuarterState();
	State * getSoldState();
	State * getWinnerState();
};

