#include <iostream>
#include "PopcornPopper.h"

using namespace std;

void PopcornPopper::on()
{
	cout << "启动爆米花机" << endl;
}

void PopcornPopper::off()
{
	cout << "关闭爆米花机" << endl;
}

void PopcornPopper::pop()
{
	cout << "开始制作爆米花" << endl;
}
