//��Ϊ ��ǰ״������� ��

#pragma once
#include "Observer.h"
#include "DisplayElement.h"
#include "WeatherData.h"

class CurrentConditionsDisplay :public Observer, public DisplayElement
{
public:
	CurrentConditionsDisplay(Subject *weatherData);
	void update(Subject *, void *);
	void display();
private:
	DataMeasurements dm;
	Subject *weatherData;
};

