#include <iostream>
#include <Windows.h>
#include "ImageProxy.h"

using namespace std;

int main()
{
	Icon * image1 = new ImageIcon;
	cout << "ֱ��ʹ����ʵ���������..." << endl;
	image1->getIconHeight();
	image1->getIconWidth();
	image1->paintIcon();

	cout << "---------------------------" << endl;
	Icon * image2 = new ImageProxy;
	image2->getIconHeight();
	image2->getIconWidth();
	image2->paintIcon();
	cout << "ʹ�ô�����󲻻�����..." << endl;
	for (int i = 0; i < 15; i++)
	{
		Sleep(2 * 1000);
		cout << i << " :�ͻ�û�б�����" << endl;
		image2->getIconHeight();
		image2->getIconWidth();
		image2->paintIcon();
	}

	delete image1;
	delete image2;
	return 0;
}