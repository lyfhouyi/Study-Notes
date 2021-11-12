#include <iostream>
#include "Waitress.h"

using namespace std;

Waitress::Waitress(const vector<Menu*>& menus)
{
	this->menus = menus;
}

void Waitress::printMenu()
{
	for (Menu * menu : menus)
	{
		Iterator * iterator = menu->createIterator();
		printMenu(iterator);
		delete iterator;
		iterator = nullptr;
	}
}

void Waitress::printMenu(Iterator * iterator)
{
	if (iterator == nullptr)
		return;
	MenuItem * menuItem = nullptr;
	while (iterator->hasNext())
	{
		menuItem = (MenuItem *)iterator->next();
		cout << menuItem->getName() << ", " << menuItem->getPrice() << " -- " << menuItem->getDescription() << endl;
	}
}
