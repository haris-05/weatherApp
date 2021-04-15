/** @format */

import React from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {Picker, Icon} from 'native-base';
import {Colors, Metrics} from '../../GlobalAppStyles';

class PickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: 'Select',
    };
  }

  onChange = (itemValue, itemIndex, name) => {
    if (itemValue !== this.props.placeholder) {
      this.props.onValueChange(itemValue, name);
    }
    this.setState({
      selectedTask: itemValue === '' ? 'Select' : itemValue,
    });
  };

  render() {
    const {
      data,
      placeholder,
      selectedItem,
      name,
      clearOnChange,
      enabled = true,
    } = this.props;
    const items = data || [];
    let pickerItems = [];
    let clearOnChangeProp = clearOnChange || false;
    const placeholderLabel = placeholder || 'Select';
    let selectedValue = selectedItem || this.state.selectedTask;
    if (clearOnChangeProp) selectedValue = selectedItem;

    if (Platform.OS == 'android') {
      pickerItems.push(
        <Picker.Item
          key={0}
          value={placeholderLabel}
          label={placeholderLabel}
          color={Colors.secondaryText}
          style={styles.paddingPicker}
        />,
      );
    }

    if (items.length) {
      data.map((item, key) => {
        let pickerItem = (
          <Picker.Item key={key} value={item.value} label={item.name} />
        );
        pickerItems.push(pickerItem);
      });
    }

    return (
      <View style={[styles.pickerMain, {backgroundColor: Colors.white}]}>
        <Icon style={[styles.arrowIcon]} name="ios-chevron-down-outline" />
        <Picker
          headerStyle={{
            backgroundColor: Colors.primary,
            borderColor: Colors.white,
          }}
          headerBackButtonTextStyle={{color: Colors.white}}
          headerTitleStyle={{color: Colors.white}}
          textStyle={[styles.formFontSettings]}
          mode="dropdown"
          enabled={enabled}
          style={styles.formControlForPicker}
          placeholder={placeholderLabel}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) =>
            this.onChange(itemValue, itemIndex, name)
          }>
          {pickerItems}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerMain: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primary,
    marginVertical: Metrics.baseMargin,
  },
  arrowIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 2,
    color: Colors.primary,
  },
  formFontSettings: {
    fontSize: 14,
  },
  formControlForPicker: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0,
    height: 50,
    width: '85%',
  },
});

export default PickerComponent;
