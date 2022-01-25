import React from 'react';
import {
  Container,
  Input,
  ArrowIcon,
  Options,
  Item,
  Helper,
  CloseIcon,
  SearchInput,
} from './ComboBox.styles';
import arrowIcon from '../../assets/icons/down-arrow.svg';
import closeIcon from '../../assets/icons/close.svg';

type Props = {
  data: string[];
  clearable?: boolean;
  searchable?: boolean;
};

const ComboBox = ({ data, clearable, searchable }: Props) => {
  const [currency, setCurrency] = React.useState<string>('');
  const [options, setOptions] = React.useState<boolean>(false);
  const [currencies, setCurrencies] = React.useState<string[]>([]);

  const handleSelectCurrency = (item: string) => {
    setCurrency(item);
    setOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOptions(false);
    }, 250);
  };

  const filterCurrency = (value: string) => {
    if (value === 'todo') {
      setCurrencies(data);
    } else if (value.length === 0 || value.length <= 2) {
      setCurrencies([]);
    } else if (value.length >= 3) {
      const filtered = data.filter((item) => item.includes(value));
      setCurrencies(filtered);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
    searchable ? filterCurrency(e.target.value) : null;
  };

  const handleOptionsContainer = () => {
    options ? setOptions(false) : setOptions(true);
    if (!searchable) setCurrencies(data);
  };

  const handleClearable = () => {
    setCurrency('');
    if (!searchable) {
      setCurrencies(data);
    } else setCurrencies([]);
  };

  return (
    <Container>
      {!searchable ? (
        <Input
          name="currency"
          value={options ? '' : currency}
          onChange={handleChange}
          onClick={() => setOptions(true)}
          onFocus={() => setOptions(true)}
          onBlur={() => handleBlur()}
          placeholder={currency ? `${currency}` : 'Seleccione un opción'}
        />
      ) : (
        <SearchInput
          name="currency"
          type="text"
          value={currency}
          onChange={handleChange}
          onClick={() => setOptions(true)}
          onFocus={() => setOptions(true)}
          onBlur={() => handleBlur()}
          placeholder="Empiece a escribir..."
        />
      )}
      <ArrowIcon src={arrowIcon} alt="option selected" onClick={handleOptionsContainer} />
      {clearable && (
        <CloseIcon src={closeIcon} alt="clear option" onClick={handleClearable} />
      )}
      {options && currencies.length > 0 ? (
        <Options>
          {currencies?.map((item) => (
            <Item key={item} onClick={() => handleSelectCurrency(item)}>
              {item}
            </Item>
          ))}
        </Options>
      ) : !currency ? (
        <Helper>
          {`${
            searchable
              ? 'Escriba al menos 3 letras o la palabra *todo* para ver todas las opciones disponibles'
              : 'Por favor seleccione una opcion'
          }`}
        </Helper>
      ) : null}
    </Container>
  );
};

export default ComboBox;
