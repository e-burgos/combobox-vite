import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeConfig } from '../../../setupTests';
import { currency } from '../../dummy';
import ComboBox from '../ComboBox/ComboBox';
import {
  Container,
  Input,
  ArrowIcon,
  Options,
  Item,
  CloseIcon,
  SearchInput,
  Helper,
} from '../ComboBox/ComboBox.styles';

// Enzyme Adapter
enzymeConfig;

describe('Testing ComboBox Component', () => {
  test('should ComboBox render OK', () => {
    expect(() => shallow(<ComboBox data={currency} />)).not.toThrow();
  });

  test('styled components of container input should display when the combo box is close', () => {
    const wrapper = shallow(<ComboBox data={currency} />);
    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(ArrowIcon)).toHaveLength(1);
    expect(wrapper.find(Options)).toHaveLength(0);
    expect(wrapper.find(Item)).toHaveLength(0);
    expect(wrapper.find(Helper)).toHaveLength(1);
  });

  test('styles components of the options should appear when the combo box is open', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([true, setOptionsMkFn]);
    const wrapper = mount(<ComboBox data={currency} />);
    wrapper.find(ArrowIcon).simulate('click');
    expect(setOptionsMkFn).toHaveBeenCalledWith(['Dolar', 'Peso', 'Rublo']);
    wrapper.unmount();
  });

  test('options should show when the ComboBox gains focus', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [false, setOptionsMkFn]);
    const wrapper = mount(<ComboBox data={currency} />);
    wrapper.find(Input).simulate('focus');
    expect(setOptionsMkFn).toHaveBeenCalledWith(true);
  });

  test('options should stop showing when the ComboBox loses focus', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([true, setOptionsMkFn]);
    const wrapper = mount(<ComboBox data={currency} />);
    wrapper.find(Input).simulate('blur');
    setTimeout(() => {
      expect(setOptionsMkFn).toHaveBeenCalledWith(false);
    }, 250);
  });

  test('currency state should be get the input value when change', () => {
    const setCurrencyMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue(['', setCurrencyMkFn]);
    const wrapper = mount(<ComboBox data={currency} />);
    wrapper.find(Input).simulate('change', { target: { value: 'Peso' } });
    expect(setCurrencyMkFn).toHaveBeenCalledWith('Peso');
  });

  test('if open options should stop showing when press ArrowIcon', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([true, setOptionsMkFn]);
    const wrapper = shallow(<ComboBox data={currency} />);
    wrapper.find(ArrowIcon).simulate('click');
    expect(setOptionsMkFn).toHaveBeenCalledWith(false);
  });

  test('if close options should show the options when press ArrowIcon', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([false, setOptionsMkFn]);
    const wrapper = shallow(<ComboBox data={currency} />);
    wrapper.find(ArrowIcon).simulate('click');
    expect(setOptionsMkFn).toHaveBeenCalledWith(true);
  });

  test('the selected option should be cleared when pressing CloseIcon', () => {
    const setCurrencyMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([true, setCurrencyMkFn]);
    const wrapper = mount(<ComboBox data={currency} clearable />);
    expect(wrapper.find(CloseIcon)).toHaveLength(1);
    wrapper.find(Input).simulate('change', { target: { value: 'Peso' } });
    wrapper.find(CloseIcon).simulate('click');
    expect(setCurrencyMkFn).toHaveBeenCalledWith('');
  });

  test('options should show filtered when the input change its value', () => {
    const setCurrenciesMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([currency, setCurrenciesMkFn]);
    const wrapper = mount(<ComboBox data={currency} clearable searchable />);
    expect(wrapper.find(SearchInput)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(0);
    wrapper.find(SearchInput).simulate('change', { target: { value: 'Dol' } });
    expect(setCurrenciesMkFn).toHaveBeenCalledWith(['Dolar']);
  });

  test('options should show when the SearchInput gains focus or click it', () => {
    const setOptionsMkFn = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [false, setOptionsMkFn]);
    const wrapper = mount(<ComboBox data={currency} clearable searchable />);
    wrapper.find(SearchInput).simulate('focus');
    expect(setOptionsMkFn).toHaveBeenCalledWith(true);
    wrapper.find(SearchInput).simulate('blur');
    setTimeout(() => {
      expect(setOptionsMkFn).toHaveBeenCalledWith(false);
    }, 250);
    wrapper.find(SearchInput).simulate('click');
    expect(setOptionsMkFn).toHaveBeenCalledWith(true);
  });
});
