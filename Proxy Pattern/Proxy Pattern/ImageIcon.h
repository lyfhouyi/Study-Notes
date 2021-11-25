//此为 真实图像 类

#pragma once
#include "Icon.h"

class ImageIcon : public Icon
{
public:
	ImageIcon();
	virtual void getIconWidth();
	virtual void getIconHeight();
	virtual void paintIcon();
	~ImageIcon();
};

