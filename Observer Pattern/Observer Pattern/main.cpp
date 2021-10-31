//此为用户的使用代码

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

	cout << "只有一个观察者：" << endl;
	weatherData.setMeasurements(dm1);
	cout << "又增加了一个观察者：" << endl;
	StatisticsDisplay statisticsDisplay(&weatherData);
	weatherData.setMeasurements(dm2);
	cout << "删除了一个观察者：" << endl;
	weatherData.removeObserver(&currentConditionsDisplay);
	weatherData.setMeasurements(dm2);
	return 0;
}