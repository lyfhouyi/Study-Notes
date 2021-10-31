//��Ϊ ����:���� ��

#pragma once
#include "CondimentDecorator.h"

class Milk :public CondimentDecorator
{
public:
	Milk(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
private:
	Beverage *beverage;
};

