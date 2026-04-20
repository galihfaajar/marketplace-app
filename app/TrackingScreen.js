import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function TrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Ambil parameter dari navigasi (dikirim saat checkout)
  const orderItems = route.params?.items || [];
  const orderTotal = route.params?.total || 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lacak Pesanan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Ilustrasi */}
        <View style={styles.statusBox}>
          <View style={styles.iconCircle}>
            <Text style={styles.statusEmoji}>🚚</Text>
          </View>
          <Text style={styles.statusTitle}>Sedang Dikirim oleh Bagas</Text>
          <Text style={styles.statusSubtitle}>Kurir Reguler - Estimasi 2-3 Hari</Text>
        </View>

        {/* Timeline Pengiriman Sederhana */}
        <View style={styles.timeline}>
          <Text style={styles.sectionTitle}>Status Pengiriman</Text>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIconActive} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitleActive}>Pesanan dalam Perjalanan</Text>
              <Text style={styles.timelineTime}>Hari ini, 15:42</Text>
            </View>
          </View>
          
          <View style={styles.timelineLine} />
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Pesanan Dikemas</Text>
              <Text style={styles.timelineTime}>Hari ini, 10:15</Text>
            </View>
          </View>

          <View style={styles.timelineLine} />

          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Pesanan Diterima Penjual</Text>
              <Text style={styles.timelineTime}>Hari ini, 09:30</Text>
            </View>
          </View>
        </View>

        {/* Ringkasan Pesanan */}
        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Rincian Pesanan</Text>
          {orderItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={[styles.itemImage, { backgroundColor: item.color }]}>
                <Text style={styles.itemEmoji}>🛍️</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemMeta}>{item.qty} x {formatRupiah(item.price)}</Text>
              </View>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{formatRupiah(orderTotal)}</Text>
          </View>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Button Kembali */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Main')}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  content: {
    padding: 20,
  },
  statusBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#F0EEFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusEmoji: {
    fontSize: 40,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  timeline: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIconActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6C63FF',
    borderWidth: 3,
    borderColor: '#D4D1FF',
    marginTop: 4,
    marginRight: 16,
    zIndex: 2,
  },
  timelineIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
    marginRight: 16,
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 6,
    marginTop: -8,
    marginBottom: -8,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitleActive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 12,
    color: '#AAA',
  },
  orderSummary: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  itemMeta: {
    fontSize: 13,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6C63FF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  backButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
