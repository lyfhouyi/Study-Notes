//��Ϊ �������˵������� ��

#pragma once
#include <map>
#include "Iterator.h"
#include "MenuItem.h"

using namespace std;

class CafeMenuIterator :public Iterator
{
private:
	map<string, MenuItem *> menuItems;
	map<string, MenuItem *>::iterator it;
public:
	CafeMenuIterator(const map<string, MenuItem *> &menuItems);
	virtual bool hasNext();
	virtual void * next();
	~CafeMenuIterator();
};

