//��Ϊ ����:�Ӷ��� ��

#pragma once
#include "CondimentDecorator.h"

class Soy :public CondimentDecorator
{
public:
	Soy(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
private:
	Beverage *beverage;
};

