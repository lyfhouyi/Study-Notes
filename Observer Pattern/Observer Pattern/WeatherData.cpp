#include "WeatherData.h"
#include <algorithm>

WeatherData::WeatherData() :Subject(), observers(set<Observer *>()), dm(new DataMeasurements{ 0,0,0 }) {}

WeatherData::~WeatherData()
{
	delete this->dm;
}

void WeatherData::registerObserver(Observer * o)
{
	this->observers.insert(o);
}

void WeatherData::removeObserver(Observer * o)
{
	this->observers.erase(o);
}

void WeatherData::notifyObservers()
{
	for_each(this->observers.begin(), this->observers.end(), [&](Observer *o) {
		o->update(this, this->dm);
	});
}

void WeatherData::measurementsChanged()
{
	this->notifyObservers();
}

DataMeasurements * WeatherData::getDataMeasurements()
{
	return this->dm;
}

void WeatherData::setMeasurements(DataMeasurements dm)
{
	this->dm->temperature = dm.temperature;
	this->dm->humidity = dm.humidity;
	this->dm->pressure = dm.pressure;
	measurementsChanged();
}
