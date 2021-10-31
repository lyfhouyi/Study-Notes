//��Ϊ�û���ʹ�ô���

#include <iostream>
#include "WeatherData.h"
#include "CurrentConditionsDisplay.h"
#include "StatisticsDisplay.h"

using namespace std;

int main()
{
	WeatherData weatherData;
	CurrentConditionsDisplay currentConditionsDisplay(&weatherData);
	DataMeasurements dm1{ 28.3,0.65,103 };
	DataMeasurements dm2{ 31.5,0.75,105 };

	cout << "ֻ��һ���۲��ߣ�" << endl;
	weatherData.setMeasurements(dm1);
	cout << "��������һ���۲��ߣ�" << endl;
	StatisticsDisplay statisticsDisplay(&weatherData);
	weatherData.setMeasurements(dm2);
	cout << "ɾ����һ���۲��ߣ�" << endl;
	weatherData.removeObserver(&currentConditionsDisplay);
	weatherData.setMeasurements(dm2);
	return 0;
}