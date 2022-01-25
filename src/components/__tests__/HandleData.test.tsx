import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeConfig } from '../../../setupTests';
import HandleData from '../HandleData/HandleData';
import { Button, Helper } from '../HandleData/HandleData.styles';
import * as useGetCurrencies from '../../utils/useGetCurrencies';
import ComboBox from '../ComboBox/ComboBox';
import { currency } from '../../dummy';

// Enzyme Adapter
enzymeConfig;

const mockGetCurrencies = [
  'Afgani afgano',
  'Lek albanés',
  'Euro',
  'Peso argentino',
  'Dolar australiano',
  'Dolar americano',
  'Boliviano',
  'Peso colombiano',
  'Colón costarricense',
  'Corona danesa',
  'Franco comorano',
  'Peso chileno',
  'Yuan chino',
  'Riyal qatarí',
];

describe('Testing ComboBox Component', () => {
  test('should ComboBox render OK', () => {
    expect(() => shallow(<HandleData localData={false} />)).not.toThrow();
  });

  test('Check loading callback', () => {
    jest.spyOn(useGetCurrencies, 'useGetCurrencies').mockReturnValue({
      loading: true,
      error: null,
      fetchData: [],
    });
    const wrapper = mount(<HandleData localData={false} />);
    expect(wrapper.find(Helper)).toHaveLength(1);
    expect(wrapper.find(Helper).text()).toEqual('Cargando..');
  });

  test('Check data error', () => {
    jest.spyOn(useGetCurrencies, 'useGetCurrencies').mockReturnValue({
      loading: false,
      error: null,
      fetchData: undefined,
    });
    const wrapper = mount(<HandleData localData={false} />);
    expect(wrapper.find(Helper)).toHaveLength(1);
    expect(wrapper.find(Helper).text()).toEqual(
      'Upps, parece que hubo un problema con los datos, por favor utilice los datos locales.',
    );
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  test('Check render ok ComboBox with remote data', () => {
    jest.spyOn(useGetCurrencies, 'useGetCurrencies').mockReturnValue({
      loading: false,
      error: null,
      fetchData: mockGetCurrencies,
    });
    const wrapper = mount(<HandleData localData={false} />);
    expect(wrapper.find(ComboBox)).toHaveLength(1);
    expect(wrapper.find(ComboBox).prop('clearable')).toBeTruthy();
    expect(wrapper.find(ComboBox).prop('searchable')).toBeTruthy();
    expect(wrapper.find(ComboBox).prop('data')).toEqual(mockGetCurrencies);
  });

  test('Check render ok ComboBox wth local data', () => {
    jest.spyOn(useGetCurrencies, 'useGetCurrencies').mockReturnValue({
      loading: false,
      error: null,
      fetchData: mockGetCurrencies,
    });
    const wrapper = mount(<HandleData localData={true} />);
    expect(wrapper.find(ComboBox)).toHaveLength(1);
    expect(wrapper.find(ComboBox).prop('clearable')).toBeTruthy();
    expect(wrapper.find(ComboBox).prop('searchable')).toBeFalsy();
    expect(wrapper.find(ComboBox).prop('data')).toEqual(currency);
  });
});
