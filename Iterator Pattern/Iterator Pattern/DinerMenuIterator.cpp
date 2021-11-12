#include <iostream>
#include "DinerMenuIterator.h"

using namespace std;

DinerMenuIterator::DinerMenuIterator(const vector<MenuItem*> &menuItems) :Iterator(), position(0)
{
	this->menuItems = menuItems;
}

bool DinerMenuIterator::hasNext()
{
	if (position >= this->menuItems.size())
	{
		return false;
	}
	return true;
}

void * DinerMenuIterator::next()
{
	MenuItem * menuItem = this->menuItems[this->position];
	this->position++;
	return menuItem;
}

DinerMenuIterator::~DinerMenuIterator()
{
	cout << "~DinerMenuIterator" << endl;
}
