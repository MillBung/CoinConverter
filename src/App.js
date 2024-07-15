import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [coin, setCoin] = useState(0);
    const [money, setMoney] = useState(0);
    const [coinName, setCoinName] = useState("");
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json()
                .then((json) => {
                    setCoins(json);
                    setLoading(false);
                    setCoin(json[0].quotes.USD.price);
                    setCoinName(json[0].name + " (" + json[0].symbol + ")");
                }));
    }, []);
    const onSelect = (event) => {
        setCoin(event.target.value.split(":")[1].trim());
        setCoinName(event.target.value.split(":")[0].trim());
    }
    const onChange = (event) => {
        setMoney(event.target.value);
    }
    return (
        <div>
            <h1>The Coins!</h1>
            {loading ? <strong>Loading</strong> : null}
            <select onChange={onSelect}>
                {coins.map((coin) => (
                    <option value={coin.quotes.USD.price.symbol} key={coin.id}>
                        {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
                    </option>
                ))}
            </select>
            <div>
                <input
                    placeholder={"Write your money"}
                    value={money}
                    onChange={onChange}
                />
            </div>
            {loading ? null
                : (money/coin) !== 0 ? <h2>You can buy {money/coin} {coinName}!</h2>
                    : null}
        </div>
    );
}

export default App;
