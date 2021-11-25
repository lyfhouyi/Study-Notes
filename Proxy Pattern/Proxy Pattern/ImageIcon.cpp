#include <iostream>
#include <Windows.h>
#include "ImageIcon.h"

using namespace std;

ImageIcon::ImageIcon() :Icon()
{
	cout << "\t\t\t\t\t\tImageIcon：开始下载..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon：正在下载..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon：正在下载..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon：正在下载..." << endl;
	Sleep(5 * 1000);
	cout << "\t\t\t\t\t\tImageIcon：下载完成" << endl;
}

void ImageIcon::getIconWidth()
{
	cout << "ImageIcon：输出图像宽度" << endl;
}

void ImageIcon::getIconHeight()
{
	cout << "ImageIcon：输出图像高度" << endl;
}

void ImageIcon::paintIcon()
{
	cout << "ImageIcon：绘制图像" << endl;
}

ImageIcon::~ImageIcon()
{
	cout << "~ImageIcon" << endl;
}
