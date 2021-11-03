//此为 饮料 抽象基类

#pragma once
#include <string>

using namespace std;

class Beverage
{
public:
	enum Size { TALL, GRANDE, VENTI };
protected:
	string description;
	Size size;

public:
	Beverage(Size size= TALL);
	virtual string getDescription();
	virtual double cost() = 0;
	Size getSize();
	virtual ~Beverage() {}
};

