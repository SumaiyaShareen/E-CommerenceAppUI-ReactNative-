import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F8F8F8' },
  productImage: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 10 },
  productTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  productPrice: { fontSize: 20, color: '#007bff', marginVertical: 5 },
  productDescription: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  backButton: { backgroundColor: '#ADD8E6', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  backButtonText: { fontWeight: 'bold' },
});

export default ProductDetailsScreen;
