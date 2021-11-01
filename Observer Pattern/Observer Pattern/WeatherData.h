//��Ϊ ����վ ��

#pragma once
#include <set>
#include "Subject.h"

using namespace std;

//��Ϊ�������ݵķ�װ������վ��۲���������ʹ��
struct DataMeasurements
{
	float temperature;
	float humidity;
	float pressure;
};

class WeatherData : public Subject
{
private:
	set<Observer *> observers;
	DataMeasurements *dm;

public:
	WeatherData();
	~WeatherData();
	virtual void registerObserver(Observer *o);
	virtual void removeObserver(Observer *o);
	virtual void notifyObservers();
	void measurementsChanged(); //һ������վ�������£��˷����ᱻ����
	DataMeasurements *getDataMeasurements(); //�˷������۲���������ʹ��
	void setMeasurements(DataMeasurements dm); //�˷������������ԣ�ģ������վ�Ĳ������£���۲���ģʽ�޹ء�
};

