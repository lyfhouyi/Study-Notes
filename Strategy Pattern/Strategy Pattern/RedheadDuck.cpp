#include "RedheadDuck.h"
#include <iostream>

using namespace std;

RedheadDuck::RedheadDuck(FlyBehavior * fb, QuackBehavior * qb) :Duck(fb, qb)
{

	//this->setFlyBehavior(new FlyWithWings); //默认使用 用翅膀飞 算法
	//this->setQuackBehavior(new Quack); //默认使用 呱呱叫 算法
}


RedheadDuck::~RedheadDuck()
{
	cout << "RedheadDuck::~RedheadDuck" << endl;
}

void RedheadDuck::display()
{
	cout << "我是 RedheadDuck" << endl;
}
