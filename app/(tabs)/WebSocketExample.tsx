import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import axios from 'axios';


const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
  });
  
const WebSocketExample = ({initialData}) => {
  console.log("initialData", initialData)
    const [cryptoPrices, setCryptoPrices] = useState({
        bitcoin: initialData["btc"],
        ethereum: initialData["eth"],
        binanceCoin: initialData["bnb"],
        cardano: initialData["ada"],
        solana: initialData["sol"],
        xrp: initialData["xrp"],
        dogecoin: initialData["doge"]
      });
  useEffect(() => {
    const symbols = [
        'bitcoin',
        'ethereum',
        'binance-coin',
        'cardano',
        'solana',
        'xrp',
        'dogecoin'
      ];
      const symbolString = symbols.join(',');

    // Open a WebSocket connection
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbolString}`);

    // Handle WebSocket open event
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // Handle WebSocket message event
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update state only if prices are received for both Bitcoin and Ethereum
      setCryptoPrices((prevPrices) => {
        const updatedPrices = {};
        symbols.forEach((symbol) => {
          updatedPrices[symbol] = data[symbol] !== undefined ? data[symbol] : prevPrices[symbol];
        });
        return updatedPrices;
      });
    };

    // Handle WebSocket close event
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {console.log("cryptoPrices", cryptoPrices)}
      {Object.entries(cryptoPrices).map(([symbol, price]) => (
        <Text key={symbol} style={{ color: '#fff' }}>
          {`${symbol.charAt(0).toUpperCase() + symbol.slice(1)}: ${
            price !== null ? `$${parseFloat(price).toFixed(2)}` : 'Loading...'
          }`}
        </Text>
      ))}
    </View>
  );
};



export default WebSocketExample;
