#include "MuteQuack.h"
#include <iostream>

using namespace std;

MuteQuack::~MuteQuack()
{
	cout << "MuteQuack::~MuteQuack" << endl;
}

void MuteQuack::quack()
{
	cout << "���ֳ�Ĭ" << endl;
}
