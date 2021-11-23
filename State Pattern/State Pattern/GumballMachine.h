//此为 糖果机 类

#pragma once
#include <iostream>
#include <memory>
#include "State.h"

using namespace std;

class State;

class GumballMachine
{
private:
	static shared_ptr<State>soldOutState;
	static shared_ptr<State>noQuarterState;
	static shared_ptr<State>hasQuarterState;
	static shared_ptr<State>soldState;
	static shared_ptr<State>winnerState;

	shared_ptr<State> curState;
	int count;
public:
	GumballMachine(int numberGumballs);
	void insertQuater();
	void ejectQuarter();
	void turnCrank();
	void setCurState(shared_ptr<State> state);
	void releaseBall();
	void refill(int count);

	int getCount();
	shared_ptr<State> getSoldOutState();
	shared_ptr<State> getNoQuarterState();
	shared_ptr<State> getHasQuarterState();
	shared_ptr<State> getSoldState();
	shared_ptr<State> getWinnerState();
};

