import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEuroSign } from "react-icons/fa";
import { FaBitcoinSign } from "react-icons/fa6";
import { PiCurrencyGbp } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";
function CryptoPrices() {
    const [cryptoData, setCryptoData] = useState(null);

    useEffect(() => {
        axios
            .get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((response) => {
                setCryptoData(response.data.bpi);
            })
            .catch((error) =>
                console.error("Error fetching cryptocurrency data:", error)
            );
    }, []);

    return (
        <div className="container-crypto">
            <h2>Cryptocurrency Prices</h2>
            {cryptoData && (
                <div className="crypto-card-container">
                    <div className="crypto-card">
                        <h3>
                            <FaEuroSign /> {cryptoData.EUR.code}
                        </h3>
                        <p>{cryptoData.EUR.description}</p>
                        <p>{cryptoData.EUR.rate}</p>
                        <div className="trade">
                            <RiErrorWarningLine className="icon" />
                            <button className="btn">Trade</button>
                        </div>
                    </div>
                    <div className="crypto-card">
                        <h3>
                            <FaBitcoinSign /> {cryptoData.USD.code}
                        </h3>
                        <p>{cryptoData.USD.description}</p>
                        <p>{cryptoData.USD.rate}</p>
                        <div className="trade">
                            <RiErrorWarningLine className="icon" />
                            <button className="btn">Trade</button>
                        </div>
                    </div>
                    <div className="crypto-card">
                        <h3>
                            <PiCurrencyGbp /> {cryptoData.GBP.code}
                        </h3>
                        <p>{cryptoData.GBP.description}</p>
                        <p>{cryptoData.GBP.rate}</p>
                        <div className="trade">
                            <RiErrorWarningLine className="icon" />
                            <button className="btn">Trade</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CryptoPrices;
