//此为 餐厅菜单 类

#pragma once
#include <vector>
#include "Menu.h"
#include "MenuItem.h"
#include "DinerMenuIterator.h"

using namespace std;

class DinerMenu :public Menu
{
private:
	static int MAX_ITEMS;
	vector<MenuItem *> menuItems;
public:
	DinerMenu();
	void addItem(string name, string description, bool vegetarian, double price);
	virtual Iterator * createIterator();
	~DinerMenu();
};