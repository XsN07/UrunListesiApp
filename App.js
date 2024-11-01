// UrunListesiApp/App.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);        
  const [loading, setLoading] = useState(true);        
  const [isSortedAsc, setIsSortedAsc] = useState(true); 

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data); 
        setLoading(false);         
      })
      .catch(error => console.error(error));
  }, []);

 
  const sortProductsByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return isSortedAsc ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);            
    setIsSortedAsc(!isSortedAsc);          
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <AntDesign name="staro" size={20} color="gold" style={styles.icon} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ürün Listesi</Text>
      <TouchableOpacity style={styles.sortButton} onPress={sortProductsByPrice}>
        <Text style={styles.sortButtonText}>
          Fiyata Göre Sırala ({isSortedAsc ? 'Artan' : 'Azalan'})
        </Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
  },
  icon: {
    marginTop: 5,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  sortButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
