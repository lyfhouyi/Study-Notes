//此为 气象站 类

#pragma once
#include <set>
#include "Subject.h"

using namespace std;

//此为测量数据的封装，气象站向观察者推数据使用
struct DataMeasurements
{
	float temperature;
	float humidity;
	float pressure;
};

class WeatherData : public Subject
{
public:
	WeatherData();
	~WeatherData();
	virtual void registerObserver(Observer *o);
	virtual void removeObserver(Observer *o);
	virtual void notifyObservers();
	void measurementsChanged(); //一旦气象站测量更新，此方法会被调用
	DataMeasurements *getDataMeasurements(); //此方法供观察者拉数据使用
	void setMeasurements(DataMeasurements dm); //此方法仅用来测试，模拟气象站的测量更新，与观察者模式无关。
private:
	set<Observer *> observers;
	DataMeasurements *dm;
};

