//此为 代理图像 类

#pragma once
#include "Icon.h"
#include "ImageIcon.h"

class ImageProxy : public Icon
{
private:
	ImageIcon * imageIcon;
	bool retrieving;
public:
	ImageProxy();
	virtual void getIconWidth();
	virtual void getIconHeight();
	virtual void paintIcon();
	~ImageProxy();
private:
	void myRun(ImageIcon ** imageIcon);
};

