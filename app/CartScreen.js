import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useCart } from '../utils/CartContext';
import { formatRupiah } from '../utils/formatRupiah';

function CartItem({ item, onRemove }) {
  return (
    <View style={styles.cartItem}>
      <View style={[styles.itemImage, { backgroundColor: item.color }]}>
        <Text style={styles.itemEmoji}>🛍️</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyText}>x{item.qty}</Text>
          </View>
          <Text style={styles.subtotal}>{formatRupiah(item.price * item.qty)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeBtn}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CartScreen() {
  const { cartItems, removeFromCart, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    Alert.alert(
      '🎉 Checkout',
      `Total pembayaran: ${formatRupiah(totalPrice)}\n\nLanjutkan ke pembayaran?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Bayar Sekarang', onPress: () => Alert.alert('✅ Pesanan Diterima!', 'Terima kasih sudah berbelanja di TokoKita! 🛒') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keranjang Belanja</Text>
        {totalItems > 0 && (
          <View style={styles.itemCountBadge}>
            <Text style={styles.itemCountText}>{totalItems} item</Text>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
          <Text style={styles.emptySubtitle}>Belum ada produk yang ditambahkan ke keranjang</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem item={item} onRemove={removeFromCart} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 160 }} />}
          />

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({totalItems} item)</Text>
              <Text style={styles.summaryValue}>{formatRupiah(totalPrice)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
              <Text style={[styles.summaryValue, { color: '#2ECC71' }]}>Gratis</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Pembayaran</Text>
              <Text style={styles.totalValue}>{formatRupiah(totalPrice)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutText}>💳  Checkout Sekarang</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    flex: 1,
  },
  itemCountBadge: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 30,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyBadge: {
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C63FF',
  },
  subtotal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C63FF',
  },
  removeBtn: {
    padding: 8,
    marginLeft: 8,
  },
  removeText: {
    fontSize: 14,
    color: '#CCC',
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#888',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6C63FF',
  },
  checkoutButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 14,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
