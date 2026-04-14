import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categories, banners, products } from '../data/products';
import { formatRupiah } from '../utils/formatRupiah';
import { useCart } from '../utils/CartContext';

function StarRating({ rating }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={[styles.star, { color: i <= Math.round(rating) ? '#F7B731' : '#DDD' }]}>
          ★
        </Text>
      ))}
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
}

function BannerItem({ item }) {
  return (
    <View style={[styles.bannerCard, { backgroundColor: item.color }]}>
      <Text style={styles.bannerTitle}>{item.title}</Text>
      <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
    </View>
  );
}

function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={() => onPress(item)} activeOpacity={0.85}>
      <View style={[styles.productImage, { backgroundColor: item.color }]}>
        <Text style={styles.productEmoji}>🛍️</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatRupiah(item.price)}</Text>
        <StarRating rating={item.rating} />
        <Text style={styles.soldText}>{item.sold.toLocaleString('id-ID')} terjual</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result =
        selectedCategory === 'all'
          ? products
          : products.filter((p) => p.category === selectedCategory);
      setFilteredProducts(result);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const renderHeader = () => (
    <View>
      {/* App Header */}
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>🛒 TokoKita</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar (decorative) */}
      <View style={styles.searchBar}>
        <Text style={styles.searchPlaceholder}>🔍  Cari produk...</Text>
      </View>

      {/* Banner Promo */}
      <FlatList
        data={banners}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <BannerItem item={item} />}
        contentContainerStyle={styles.bannerList}
      />

      {/* Category Filter */}
      <Text style={styles.sectionTitle}>Kategori</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, selectedCategory === item.id && styles.chipActive]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text style={[styles.chipText, selectedCategory === item.id && styles.chipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chipList}
      />

      <Text style={styles.sectionTitle}>Produk</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      {loading ? (
        <View style={styles.loadingContainer}>
          {renderHeader()}
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text style={styles.loadingText}>Memuat produk...</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={(p) => navigation.navigate('Detail', { product: p })} />
          )}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>😅 Tidak ada produk di kategori ini</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D2D2D',
    letterSpacing: -0.5,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  bannerList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  bannerCard: {
    width: 280,
    height: 120,
    borderRadius: 16,
    padding: 20,
    marginRight: 10,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  chipList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#6C63FF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  chipTextActive: {
    color: '#FFF',
  },
  productGrid: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 40,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 4,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  star: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 11,
    color: '#888',
    marginLeft: 4,
  },
  soldText: {
    fontSize: 10,
    color: '#AAA',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
  },
});
