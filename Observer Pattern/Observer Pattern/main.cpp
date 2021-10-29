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
	StatisticsDisplay statisticsDisplay(&weatherData);
	DataMeasurements dm1{ 28.3,0.65,103 };
	DataMeasurements dm2{ 30.4,0.70,104 };
	DataMeasurements dm3{ 31.5,0.75,105 };

	weatherData.setMeasurements(dm1);
	weatherData.setMeasurements(dm2);
	weatherData.setMeasurements(dm3);
	return 0;
}