#include <iostream>
#include "CafeMenuIterator.h"

using namespace std;

CafeMenuIterator::CafeMenuIterator(const map<string, MenuItem*>& menuItems) :Iterator()
{
	this->menuItems = menuItems;
	it = this->menuItems.begin();
}

bool CafeMenuIterator::hasNext()
{
	return it != this->menuItems.end();
}

void * CafeMenuIterator::next()
{
	MenuItem * menuItem = it->second;
	it++;
	return menuItem;
}

CafeMenuIterator::~CafeMenuIterator()
{
	cout << "~CafeMenuIterator" << endl;
}
