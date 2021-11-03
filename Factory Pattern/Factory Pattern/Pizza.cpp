#include <iostream>
#include "Pizza.h"

string Pizza::getName()
{
	return this->name;
}

void Pizza::setName(string name)
{
	this->name = name;
}

void Pizza::bake()
{
	cout << "������" << endl;
}

void Pizza::cut()
{
	cout << "�б���" << endl;
}

void Pizza::box()
{
	cout << "����װ��" << endl;
}

Pizza::~Pizza()
{
	cout << "~Pizza" << endl;
	delete this->dough;
	delete this->clam;
	delete this->sauce;
	cout << "~Pizza������ԭ�����ͷ�" << endl;
}
