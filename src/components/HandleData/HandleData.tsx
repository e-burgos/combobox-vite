import React, { useEffect, useState } from 'react';
import { currency } from '../../dummy';
import ComboBox from '../../components/ComboBox/ComboBox';
import { useGetCurrencies } from '../../utils/useGetCurrencies';
import { Helper, Button } from './HandleData.styles';

type Props = {
  localData: boolean;
};

function HandleData({ localData }: Props) {
  const url = 'http://localhost:8081/get-currencies';
  const { fetchData, loading, error } = useGetCurrencies(url);
  const [changeData, setChanceData] = useState(localData);
  const [errorData, setErrorData] = useState(false);

  useEffect(() => {
    if (error !== null || fetchData?.length === undefined) setErrorData(true);
  }, [fetchData]);

  const handleClick = () => {
    setChanceData(true);
    setErrorData(false);
  };

  return (
    <>
      {errorData ? (
        <>
          <Helper>
            Upps, parece que hubo un problema con los datos, por favor utilice los datos
            locales.
          </Helper>
          <Button onClick={handleClick}>Cambiar a Datos Locales</Button>
        </>
      ) : loading ? (
        <Helper>Cargando..</Helper>
      ) : changeData ? (
        <ComboBox data={currency} clearable />
      ) : (
        <ComboBox
          data={fetchData !== undefined ? fetchData : currency}
          clearable
          searchable
        />
      )}
    </>
  );
}

export default HandleData;
