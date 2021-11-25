//此为 图像接口 抽象基类

#pragma once
class Icon
{
public:
	virtual void getIconWidth() = 0;
	virtual void getIconHeight() = 0;
	virtual void paintIcon() = 0;
	virtual ~Icon();
};

