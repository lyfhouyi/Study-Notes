//此为 Duck 基类

#pragma once
#include "FlyBehavior.h"
#include "QuackBehavior.h"

class Duck
{
public:
	virtual ~Duck();
	Duck(FlyBehavior* fb, QuackBehavior* qb);
	void setFlyBehavior(FlyBehavior* fb);
	void setQuackBehavior(QuackBehavior* qb);
	void performQuack();
	void performFly();
	void swim();
	virtual void display() {};
private:
	FlyBehavior* flyBehavior;
	QuackBehavior* quackBehavior;
};

