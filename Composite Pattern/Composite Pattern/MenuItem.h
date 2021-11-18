//此为 菜单项 类

#pragma once
#include <string>
#include "MenuComponent.h"

using namespace std;

class MenuItem :public MenuComponent
{
private:
	string name;
	string description;
	bool vegetarian;
	double price;
public:
	MenuItem(string name, string description, bool vegetarian, double price);
	string getName();
	string getDescription();
	bool isVegetarian();
	double getPrice();
	virtual void print();
	~MenuItem();
};

