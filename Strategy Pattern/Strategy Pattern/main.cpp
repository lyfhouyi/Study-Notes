//此为用户的使用代码

#include <iostream>
#include "RedheadDuck.h" //红头鸭子类
#include "FlyAlgorithm.h" //飞行算法族
#include "QuackAlgorithm.h" //呱呱叫算法族

using namespace std;

int main()
{
	FlyBehavior* fb = new FlyWithWings;
	QuackBehavior* qb = new Quack;
	Duck* redheadDuck = new RedheadDuck(fb, qb);


	redheadDuck->display();
	redheadDuck->swim();
	redheadDuck->performFly();
	redheadDuck->performQuack();

	FlyBehavior* fb2 = new FlyNoWay;
	redheadDuck->setFlyBehavior(fb2);
	redheadDuck->performFly();

	QuackBehavior* qb2 = new MuteQuack;
	redheadDuck->setQuackBehavior(qb2);
	redheadDuck->performQuack();

	delete fb;
	delete qb;
	delete redheadDuck;
	delete fb2;
	delete qb2;
	return 0;
}