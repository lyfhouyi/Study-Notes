//此为 比萨店 抽象基类

#pragma once
#include <string>
#include "Pizza.h"

using namespace std;

class PizzaStore
{
public:
	Pizza *orderPizza(string type);
	virtual ~PizzaStore();
protected:
	virtual Pizza *createPizza(string type) = 0;
	
};

