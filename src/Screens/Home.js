import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import axios from 'axios';
import {Colors, Fonts, Metrics} from '../GlobalAppStyles';
import {
  AppPrimaryButton,
  AppText,
  PickerComponent,
  WeatherCard,
  AppLoader,
  LineChartComponent,
} from '../Components';
import StaticData from '../StaticData';
import {APP_ROUTES} from '../Navigation';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'islamabad',
      weatherData: [],
      graphData: [],
      xAxisData: [],
      loading: true,
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
      for (let i = 0; i < 7; i++) {
        tempratures[i] = list[i].main.temp; // only taking data for 7
      }
      this.setState({
        weatherData: response.data,
        graphData: tempratures,
        xAxisData: dates,
        loading: false,
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
    const {weatherData, city, graphData, xAxisData, loading} = this.state;
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
        {loading ? (
          <AppLoader loading={loading} />
        ) : (
          <>
            <View style={styles.weatherListContainer}>
              <FlatList
                data={weatherData.list}
                contentContainerStyle={{
                  paddingHorizontal: Metrics.baseMargin - 2,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <WeatherCard weatherItem={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {graphData.length > 0 && xAxisData.length > 0 && (
              <LineChartComponent xAxisData={xAxisData} yAxisData={graphData} />
            )}
          </>
        )}

        <View style={styles.buttonPosition}>
          <AppPrimaryButton
            label={'Go to Maps'}
            onPress={() =>
              navigation.navigate(APP_ROUTES.MAP_SCREEN, {
                latitude: weatherData.city.coord.lat,
                longitude: weatherData.city.coord.lon,
              })
            }
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
    padding: Metrics.baseMargin,
  },
  headerTitleContainer: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    width: '90%',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Fonts.size.h2,
    fontWeight: '700',
  },
  weatherListContainer: {
    marginVertical: 5,
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
