//此为 当前状况布告板 类

#pragma once
#include "Observer.h"
#include "DisplayElement.h"
#include "WeatherData.h"

class CurrentConditionsDisplay :public Observer, public DisplayElement
{
private:
	DataMeasurements dm;
	Subject *weatherData;

public:
	CurrentConditionsDisplay(Subject *weatherData);
	void update(Subject *, void *);
	void display();
};

