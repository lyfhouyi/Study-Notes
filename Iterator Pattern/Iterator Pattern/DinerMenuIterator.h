//此为 餐厅菜单迭代器 类

#pragma once
#include <vector>
#include "Iterator.h"
#include "MenuItem.h"

using namespace std;

class DinerMenuIterator :public Iterator
{
private:
	vector<MenuItem *> menuItems;
	int position;
public:
	DinerMenuIterator(const vector<MenuItem *> &menuItems);
	virtual bool hasNext();
	virtual void * next();
	~DinerMenuIterator();
};

