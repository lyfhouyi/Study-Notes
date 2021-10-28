#include "Duck.h"
#include <iostream>

using namespace std;

Duck::~Duck()
{
	cout << "Duck::~Duck" << endl;
}

Duck::Duck(FlyBehavior * fb, QuackBehavior * qb)
{
	this->flyBehavior = fb;
	this->quackBehavior = qb;
}

void Duck::setFlyBehavior(FlyBehavior * fb)
{
	this->flyBehavior = fb;
}

void Duck::setQuackBehavior(QuackBehavior * qb)
{
	this->quackBehavior = qb;
}

void Duck::performQuack()
{
	this->quackBehavior->quack();
}

void Duck::performFly()
{	
	this->flyBehavior->fly();
}

void Duck::swim()
{
	cout << "ÎÒÔÚÓÎÓ¾" << endl;
}

