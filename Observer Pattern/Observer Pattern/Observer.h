//��Ϊ �۲��� �������

#pragma once
#include "Subject.h"

class Subject;

class Observer
{
public:
	virtual void update(Subject *, void *) = 0; // Subject * ���������ݣ�void * ����������
	virtual ~Observer() {}
};

