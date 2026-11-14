const { useState, useMemo } = React;

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const convertedAmounts = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const amountInUSD = numAmount / EXCHANGE_RATES[fromCurrency];

    const results = {};
    Object.keys(EXCHANGE_RATES).forEach( currency => {
      results[currency] = amountInUSD * EXCHANGE_RATES[currency];
    });

    return results;
  }, [amount, fromCurrency]);

  const convertedAmount = convertedAmounts[toCurrency] || 0;
  const formattedAmount = convertedAmount.toFixed(2);

  return (
    <div className="currency-converter">
      <h1>
        Currency Converter
      </h1>

      <div className="converter-group">
        <label htmlFor="amount-input">
        {fromCurrency} to {toCurrency} Conversion
        </label>
        < br/>
        <input
          id="amount-input"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <br />

      <div className="converter-group">
        <label htmlFor="form-currency">
        Start Currency:
        </label>
        <br />
        <select
          id="form-currency"
          value={fromCurrency}
          onChange={ e => setFromCurrency(e.target.value)}
        >
          {Object.keys(EXCHANGE_RATES).map( (currency) => (
            <option key={currency} value={currency}>
            {currency}
            </option>
          ))}
        </select>
      </div>
      <br />

      <div className="converter-group">
        <label htmlFor="to-currency">
        Target Currency:
        </label>
        <br />
        <select
          id="to-currency"
          value={toCurrency}
          onChange={ e => setToCurrency(e.target.value)}
        >
          {Object.keys(EXCHANGE_RATES).map( (currency) => (
            <option key={currency} value={currency}>
            {currency}
            </option>
          ))}
        </select>
      </div>
      <br />

      <div className="converter-result">
      <strong>Converted Amount:</strong>
      <strong>{formattedAmount} {toCurrency}</strong>
      </div>
    </div>
  )
}
