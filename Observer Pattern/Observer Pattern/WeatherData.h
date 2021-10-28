//此为 气象站 类

#pragma once
#include <set>
#include "Subject.h"

using namespace std;

class WeatherData :	public Subject
{
public:
	WeatherData();
	virtual void registerObserver(Observer *o);
	virtual void removeObserver(Observer *o);
	virtual void notifyObservers();
	void measurementsChanged(); //一旦气象站测量更新，此方法会被调用
	void setMeasurements(float temperature, float humidity, float pressure); //此方法仅用来测试，模拟气象站的测量更新，与观察者模式无关。
private:
	set<Observer *> observers;
};

