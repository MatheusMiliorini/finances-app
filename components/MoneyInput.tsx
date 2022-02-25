import { useEffect } from "react";
import { Colors, Incubator } from "react-native-ui-lib";
import { formatMoney } from "../utils/money";

const { TextField } = Incubator;

type MoneyInputConfig = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  decimalPlaces?: number;
}

const MoneyInput = (props: MoneyInputConfig) => {

  const handleTextChange = (val: string) => {
    props.setText(formatMoney(val, props.decimalPlaces));
  }

  useEffect(() => {
    props.setText(formatMoney('', props.decimalPlaces));
  }, []);

  return (
    <TextField
      placeholder="Saldo Inicial"
      floatingPlaceholder
      enableErrors
      validate={['required', 'number']}
      validationMessage={['Campo Obrigatório!']}
      value={props.text}
      onChangeText={handleTextChange}
      keyboardType={'numeric'}
      fieldStyle={{ borderBottomWidth: 1, borderColor: Colors.green40, paddingBottom: 4 }}
    />
  );
}

export default MoneyInput;