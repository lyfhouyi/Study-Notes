//��Ϊ ��ʵͼ�� ��

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

