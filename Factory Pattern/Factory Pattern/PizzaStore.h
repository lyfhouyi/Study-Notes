//��Ϊ ������ �������

#pragma once
#include <string>
#include "Pizza.h"

using namespace std;

class PizzaStore
{
public:
	Pizza *orderPizza(string type);
	virtual Pizza *createPizza(string type) = 0;
};

