import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useCart } from '../utils/CartContext';
import { formatRupiah } from '../utils/formatRupiah';
import { useNavigation } from '@react-navigation/native';

function OrderCard({ order, onPress }) {
  // Format tanggal
  const dateObj = new Date(order.date);
  const dateString = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.boxIcon}>
          <Text style={styles.boxEmoji}>📦</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.orderId}>Pesanan #{order.id}</Text>
          <Text style={styles.orderDate}>{dateString}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.itemSummary}>
          {order.items.length} Barang • {order.items.map(i => i.name).join(', ')}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <Text style={styles.totalLabel}>Total Pembeli</Text>
        <Text style={styles.totalValue}>{formatRupiah(order.total)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function OrdersScreen() {
  const { orders } = useCart();
  const navigation = useNavigation();

  const handleOrderPress = (order) => {
    navigation.navigate('Tracking', { items: order.items, total: order.total });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
          <Text style={styles.emptySubtitle}>Barang yang sudah Anda pesan akan muncul di sini.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={() => handleOrderPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  header: {
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
  },
  listContent: {
    padding: 16,
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
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  boxIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  boxEmoji: {
    fontSize: 20,
  },
  headerInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#2ECC71',
    fontSize: 11,
    fontWeight: '700',
  },
  cardContent: {
    marginBottom: 12,
  },
  itemSummary: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    color: '#888',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#6C63FF',
  },
});
