#include <iostream>
#include <Windows.h>
#include "ImageIcon.h"

using namespace std;

ImageIcon::ImageIcon() :Icon()
{
	cout << "\t\t\t\t\t\tImageIcon����ʼ����..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon����������..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon����������..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon����������..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon���������" << endl;
}

void ImageIcon::getIconWidth()
{
	cout << "ImageIcon�����ͼ����" << endl;
}

void ImageIcon::getIconHeight()
{
	cout << "ImageIcon�����ͼ��߶�" << endl;
}

void ImageIcon::paintIcon()
{
	cout << "ImageIcon������ͼ��" << endl;
}

ImageIcon::~ImageIcon()
{
	cout << "~ImageIcon" << endl;
}
