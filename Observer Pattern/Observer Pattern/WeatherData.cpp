#include "WeatherData.h"
#include <algorithm>

WeatherData::WeatherData():Subject(), observers(set<Observer *>()){}

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
	for_each(this->observers.begin(), this->observers.end(), [&](Observer *o) {o->update(); });
}

void WeatherData::measurementsChanged()
{
	this->notifyObservers();
}
