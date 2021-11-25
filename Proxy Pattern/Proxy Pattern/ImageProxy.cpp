#include <iostream>
#include "ImageProxy.h"

ImageProxy::ImageProxy() :Icon(), retrieving(false), imageIcon(nullptr) {}

void ImageProxy::getIconWidth()
{
	if (this->imageIcon != nullptr)
		this->imageIcon->getIconWidth();
	else
	{
		cout << "ImageProxy��Ĭ�Ͽ��" << endl;
	}
}

void ImageProxy::getIconHeight()
{
	if (this->imageIcon != nullptr)
		this->imageIcon->getIconHeight();
	else
	{
		cout << "ImageProxy��Ĭ�ϸ߶�" << endl;
	}
}

void ImageProxy::paintIcon()
{
	if (this->imageIcon != nullptr)
		this->imageIcon->paintIcon();
	else
	{
		cout << "ImageProxy��ͼ�������..." << endl;
		if (!this->retrieving)
		{
			this->retrieving = true;
			thread retrievalThread(&ImageProxy::myRun, this, &this->imageIcon);
			retrievalThread.detach();
		}
	}
}

ImageProxy::~ImageProxy()
{
	if (this->imageIcon != nullptr)
	{
		delete this->imageIcon;
		this->imageIcon = nullptr;
	}
}

void ImageProxy::myRun(ImageIcon ** imageIcon)
{
	cout << "\t\t\t\t\t\t���߳�" << endl;
	*imageIcon = new ImageIcon;
	cout << "\t\t\t\t\t\t�߳̽���" << endl;
}
