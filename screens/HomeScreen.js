import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../screens/CartContext';
import { Searchbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {  // ✅ Accept `navigation` as a prop
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchBar}
        iconColor="#007bff"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard} 
            onPress={() => navigation.navigate('ProductDetails', { product: item })} // ✅ Navigate to ProductDetailsScreen
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 10 },
  searchBar: { marginBottom: 10, elevation: 3, backgroundColor: '#fff', borderRadius: 10 },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  productPrice: { fontSize: 16, color: '#007bff', marginBottom: 5 },
  addButton: { backgroundColor: '#ADD8E6', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5 },
  addButtonText: { fontWeight: 'bold' },
});

export default HomeScreen;
