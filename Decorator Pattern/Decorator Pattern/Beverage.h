//��Ϊ ���� �������

#pragma once
#include <string>

using namespace std;

class Beverage
{
public:
	Beverage();
	virtual string getDescription();
	virtual double cost() = 0;
	virtual ~Beverage() {}
protected:
	string description;
};

