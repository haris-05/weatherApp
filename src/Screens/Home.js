import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Colors, Fonts, Metrics} from '../GlobalAppStyles';
import {
  AppPrimaryButton,
  AppHeaderTitle,
  AppText,
  PickerComponent,
  WeatherCard,
  AppLoader,
} from '../Components';
import StaticData from '../StaticData';
import axios from 'axios';
import helper from '../helper';
import {LineChart} from 'react-native-chart-kit';
import {APP_ROUTES} from '../Navigation';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'islamabad',
      weatherData: [],
      graphData: [],
      xAxisData: [],
    };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData = async () => {
    const {city} = this.state;
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=1f4536f12ecc799e23cbec4676c58b00`;
      const response = await axios.get(url);
      const {list} = response.data;
      const dates = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
      const tempratures = [];
      for (let i = 0; i < 5; i++) {
        tempratures[i] = list[i].main.temp;
      }
      this.setState({
        weatherData: response.data,
        graphData: tempratures,
        xAxisData: dates,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onCityChange = value => {
    this.setState({city: value}, () => {
      this.getWeatherData();
    });
  };

  render() {
    const {weatherData, city, graphData, xAxisData} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.headerTitleContainer}>
          <AppText
            style={styles.headerTitle}>{`${city.toLocaleUpperCase()}`}</AppText>
        </View>
        <PickerComponent
          placeholder={'Select City'}
          data={StaticData.cities}
          selectedItem={city}
          onValueChange={value => this.onCityChange(value)}
        />
        <View style={styles.weatherListContainer}>
          <FlatList
            data={weatherData.list}
            contentContainerStyle={{paddingHorizontal: Metrics.baseMargin - 2}}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <WeatherCard weatherItem={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {graphData.length > 0 && xAxisData.length > 0 && (
          <LineChart
            data={{
              labels: xAxisData,
              datasets: [
                {
                  data: graphData,
                },
              ],
            }}
            width={Metrics.screenWidth - 30} // from react-native
            height={200}
            yAxisLabel="°C`"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#1462be',
              backgroundGradientFrom: '#1462be',
              backgroundGradientTo: '#146',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#146',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}

        <View style={styles.buttonPosition}>
          <AppPrimaryButton
            label={'Go to Maps'}
            onPress={() => navigation.navigate(APP_ROUTES.MAP_SCREEN)}
          />
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Metrics.doubleBaseMargin - 5,
  },
  headerTitleContainer: {
    alignSelf: 'center',
    // borderWidth: 0.5,
    // borderColor: Colors.primary,
    padding: 10,
    borderRadius: 4,
    width: '90%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Fonts.size.h2,
    fontWeight: '700',
  },
  weatherListContainer: {
    marginVertical: Metrics.doubleBaseMargin - 5,
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
