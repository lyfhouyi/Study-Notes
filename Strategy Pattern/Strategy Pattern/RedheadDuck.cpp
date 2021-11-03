#include "RedheadDuck.h"
#include <iostream>

using namespace std;

RedheadDuck::RedheadDuck(FlyBehavior * fb, QuackBehavior * qb) :Duck(fb, qb)
{

	//this->setFlyBehavior(new FlyWithWings); //Ĭ��ʹ�� �ó��� �㷨
	//this->setQuackBehavior(new Quack); //Ĭ��ʹ�� ���ɽ� �㷨
}


RedheadDuck::~RedheadDuck()
{
	cout << "RedheadDuck::~RedheadDuck" << endl;
}

void RedheadDuck::display()
{
	cout << "���� RedheadDuck" << endl;
}
