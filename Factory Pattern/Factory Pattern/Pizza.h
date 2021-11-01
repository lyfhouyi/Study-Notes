//此为 比萨 抽象基类

#pragma once
#include <string>
#include "Ingredients.h"

using namespace std;

class Pizza
{
protected:
	string name;
	Dough *dough;
	Clams *clams;
	Sauce *sauce;

public:
	string getName();
	virtual void prepare()=0;
	void bake();
	void cut();
	void box();
};

