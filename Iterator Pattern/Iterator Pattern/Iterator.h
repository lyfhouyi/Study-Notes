//此为 迭代器 抽象基类

#pragma once
class Iterator
{
public:
	virtual bool hasNext() = 0;
	virtual void * next() = 0;
	virtual ~Iterator() {}
};

