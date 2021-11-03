//此为 气象统计布告板 类

#pragma once
#include "Observer.h"
#include "DisplayElement.h"
#include "WeatherData.h"

class StatisticsDisplay :public Observer, public DisplayElement
{
private:
	DataMeasurements dm;
	Subject *weatherData;

public:
	StatisticsDisplay(Subject *weatherData);
	void update(Subject *, void *);
	void display();
};
