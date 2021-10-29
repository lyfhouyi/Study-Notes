#include <iostream>
#include "StatisticsDisplay.h"

StatisticsDisplay::StatisticsDisplay(Subject * weatherData)
{
	this->weatherData = weatherData;
	weatherData->registerObserver(this);
}

void StatisticsDisplay::update(Subject *s, void *dm)
{
	//推数据
	this->dm.temperature = ((DataMeasurements *)dm)->temperature;
	this->dm.humidity = ((DataMeasurements *)dm)->humidity;
	this->dm.pressure = ((DataMeasurements *)dm)->pressure;
	display();

	//拉数据
	DataMeasurements *newDm = ((WeatherData *)s)->getDataMeasurements();
	this->dm.temperature = newDm->temperature;
	this->dm.humidity = newDm->humidity;
	this->dm.pressure = newDm->pressure;
	display();
}

void StatisticsDisplay::display()
{
	cout << "StatisticsDisplay：temperature = " << this->dm.temperature << "  humidity = " << this->dm.humidity << "  pressure = " << this->dm.pressure << endl;
}
