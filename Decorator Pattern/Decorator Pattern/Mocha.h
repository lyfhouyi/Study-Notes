//��Ϊ ����:Ħ�� ��

#pragma once
#include "CondimentDecorator.h"

class Mocha :public CondimentDecorator
{
private:
	Beverage *beverage;

public:
	Mocha(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
};

