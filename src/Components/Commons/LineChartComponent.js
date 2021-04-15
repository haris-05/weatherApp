import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Metrics} from '../../GlobalAppStyles';

const LineChartComponent = ({xAxisData, yAxisData}) => {
  return (
    <LineChart
      data={{
        labels: xAxisData,
        datasets: [
          {
            data: yAxisData,
          },
        ],
      }}
      width={Metrics.screenWidth - 30} // from react-native
      height={Metrics.screenWidth / 2}
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
      style={styles.lineGraph}
    />
  );
};

export default LineChartComponent;

const styles = StyleSheet.create({
  lineGraph: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 16,
  },
});
