//��Ϊ ����:Ħ�� ��

#pragma once
#include "CondimentDecorator.h"

class Mocha :public CondimentDecorator
{
public:
	Mocha(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
private:
	Beverage *beverage;
};

