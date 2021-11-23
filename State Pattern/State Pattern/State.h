//此为 状态 基类

#pragma once
class State
{
public:
	virtual void insertQuarter();
	virtual void ejectQuarter();
	virtual bool turnCrank();
	virtual void dispense();
	virtual ~State();
};

