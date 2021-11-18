//此为 菜单 类

#pragma once
#include <set>
#include <string>
#include "MenuComponent.h"

using namespace std;

class Menu :public MenuComponent
{
private:
	set<MenuComponent *>menuComponents;
	string name;
	string description;
public:
	Menu(string name, string description);
	virtual string getName();
	virtual string getDescription();
	virtual void add(MenuComponent * menuComponent);
	virtual void remove(MenuComponent * menuComponent);
	virtual void print();
	~Menu();
};



