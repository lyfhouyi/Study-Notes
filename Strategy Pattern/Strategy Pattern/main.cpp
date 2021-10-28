//��Ϊ�û���ʹ�ô���

#include <iostream>
#include "RedheadDuck.h" //��ͷѼ����
#include "FlyAlgorithm.h" //�����㷨��
#include "QuackAlgorithm.h" //���ɽ��㷨��

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