#include <iostream>
#include "Coffee.h"

using namespace std;

void Coffee::brew()
{
	cout << "�÷�ˮ���ݿ���" << endl;
}

void Coffee::addCondiments()
{
	cout << "���Ǻ�ţ��" << endl;
}

bool Coffee::customerWantsCondiments()
{
	return false;
}
