//��Ϊ ����վ ��

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
	void measurementsChanged(); //һ������վ�������£��˷����ᱻ����
	void setMeasurements(float temperature, float humidity, float pressure); //�˷������������ԣ�ģ������վ�Ĳ������£���۲���ģʽ�޹ء�
private:
	set<Observer *> observers;
};

