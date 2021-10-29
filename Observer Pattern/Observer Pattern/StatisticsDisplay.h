//��Ϊ ����ͳ�Ʋ���� ��

#pragma once
#include "Observer.h"
#include "DisplayElement.h"
#include "WeatherData.h"

class StatisticsDisplay :public Observer, public DisplayElement
{
public:
	StatisticsDisplay(Subject *weatherData);
	void update(Subject *, void *);
	void display();
private:
	DataMeasurements dm;
	Subject *weatherData;
};
