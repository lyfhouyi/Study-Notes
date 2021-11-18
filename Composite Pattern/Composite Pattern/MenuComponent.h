//��Ϊ �˵���� ����

#pragma once
#include <string>

using namespace std;

class MenuComponent
{
public:
	virtual string getName();
	virtual string getDescription();
	virtual double getPrice();
	virtual bool isVegetarian();
	virtual void print();
	virtual void add(MenuComponent * menuComponent);
	virtual void remove(MenuComponent * menuComponent);
	virtual ~MenuComponent();
};

