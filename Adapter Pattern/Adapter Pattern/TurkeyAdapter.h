//´ËÎª ÊÊÅäÆ÷ Àà

#pragma once
#include "Duck.h"
#include "Turkey.h"

class TurkeyAdapter :public Duck
{
private:
	Turkey* turkey;
public:
	TurkeyAdapter(Turkey* turkey);
	virtual void quack();
	virtual void fly();
};

