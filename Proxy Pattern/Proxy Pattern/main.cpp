#include <iostream>
#include <Windows.h>
#include "ImageProxy.h"

using namespace std;

int main()
{
	Icon * image1 = new ImageIcon;
	cout << "直接使用真实对象会阻塞..." << endl;
	image1->getIconHeight();
	image1->getIconWidth();
	image1->paintIcon();

	cout << "---------------------------" << endl;
	Icon * image2 = new ImageProxy;
	image2->getIconHeight();
	image2->getIconWidth();
	image2->paintIcon();
	cout << "使用代理对象不会阻塞..." << endl;
	for (int i = 0; i < 15; i++)
	{
		Sleep(2 * 1000);
		cout << i << " :客户没有被阻塞" << endl;
		image2->getIconHeight();
		image2->getIconWidth();
		image2->paintIcon();
	}

	delete image1;
	delete image2;
	return 0;
}