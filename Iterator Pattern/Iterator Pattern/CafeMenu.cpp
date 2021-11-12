#include <iostream>
#include "CafeMenu.h"

using namespace std;

CafeMenu::CafeMenu() :Menu(), menuItems(map<string, MenuItem *>())
{
	this->addItem("Veggie Burger and Air Fries", "Veggie burger on a whole wheat bun, lettuce, tomato, add fries", true, 3.99);
	this->addItem("Burrito", "A large burrito, with whole pinto beans, salsa, guacamole", true, 4.29);
}

void CafeMenu::addItem(string name, string description, bool vegetarian, double price)
{
	MenuItem * menuItem = new MenuItem(name, description, vegetarian, price);
	this->menuItems.insert(make_pair(menuItem->getName(), menuItem));
}

Iterator * CafeMenu::createIterator()
{
	return new CafeMenuIterator(this->menuItems);
}

CafeMenu::~CafeMenu()
{
	cout << "~CafeMenu" << endl;
	for (auto &menuItem : this->menuItems)
	{
		delete menuItem.second;
		menuItem.second = nullptr;
	}
}
