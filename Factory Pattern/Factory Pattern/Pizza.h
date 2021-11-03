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
	Clams *clam;
	Sauce *sauce;

public:
	string getName();
	void setName(string name);
	virtual void prepare() = 0;
	void bake();
	void cut();
	void box();
	virtual ~Pizza();
};

