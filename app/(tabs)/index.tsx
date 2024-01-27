import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import ModalComponent from '@/components/Modal';
import { Text, View } from '@/components/Themed';
import ChartExample from '../../components/ChartExample';
import WebSocketExample from './WebSocketExample';
//import CandleStickChartExample from './CandleStickChartExample';


interface CryptoData {
  bitcoin: number;
  ethereum: number;
  binanceCoin: number; 
  cardano: number;
  solana: number;
  xrp: number;
  dogecoin: number;
}
export default function TabOneScreen() {
  console.log("see");
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    bitcoin: 0,
    ethereum: 0,
    binanceCoin: 0,
    cardano: 0,
    solana: 0,
    xrp: 0,
    dogecoin: 0,
  });
  const[isModalVisible, setIsModalVisible] = useState(false); 
  const symbols = [
    'bitcoin',
    'ethereum',
    'binance-coin',
    'cardano',
    'solana',
    'xrp',
    'dogecoin',
  ];
  const symbolString = symbols.join(',');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets?ids=${symbolString}`);
        const data = await response.json();
        const prices = {...cryptoData};

        data.data.forEach((asset) => {
          let symbol = asset.symbol;
          if (symbol === 'BTC' || symbol === 'ETH' || symbol === 'BNB' || symbol === 'ADA' || symbol === 'SOL' || symbol === 'XRP' || symbol === 'DOGE') {
            prices[asset.symbol.toLowerCase()] = asset.priceUsd;
          }
        });

        setCryptoData(prices);
      } catch (error) {
         console.error('Error fetching crypto data', error);
      }
    };

    fetchCryptoData();
  }, []); 

  const handleTextClick = (type: string) => {
    console.log('Type', type);
    setIsModalVisible(true)
  };


  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.title}>Tab Woi</Text>
      <WebSocketExample initialData={cryptoData}/>

      {cryptoData && (
        <View>
                <WebSocketExample initialData={cryptoData}/>

          {/* <TouchableOpacity onPress={()=> handleTextClick('bitcoin')}>
            <Text>Bitcoin (BTC): ${cryptoData?.bitcoin?.usd}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>  handleTextClick('ethereum')}>
            <Text>Ethereum (BTC): ${cryptoData?.ethereum?.usd}</Text>
          </TouchableOpacity> */}
        
        </View>
      )}
             
        <ModalComponent 
          isModalVisible={isModalVisible}
          toggleModal={setIsModalVisible}
        />
    </View>
        {/* <View style={{ width: 100 }}>
            <ChartExample />
          </View> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
