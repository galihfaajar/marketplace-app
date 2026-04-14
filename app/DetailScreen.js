import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../utils/CartContext";
import { formatRupiah } from "../utils/formatRupiah";

function StarRating({ rating }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={[
            styles.star,
            { color: i <= Math.round(rating) ? "#F7B731" : "#DDD" },
          ]}
        >
          ★
        </Text>
      ))}
      <Text style={styles.ratingText}>{rating} / 5.0</Text>
    </View>
  );
}

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    Alert.alert(
      "🛒 Tambah ke Keranjang",
      `Tambahkan "${product.name}" ke keranjang belanja?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Tambahkan!",
          onPress: () => {
            addToCart(product);
            Alert.alert(
              "✅ Berhasil",
              `"${product.name}" berhasil ditambahkan ke keranjang!`,
              [
                { text: "Lanjut Belanja", style: "cancel" },
                {
                  text: "Lihat Keranjang",
                  onPress: () => navigation.navigate("Main", { screen: "Cart" }),
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={product.color} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: product.color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
      </View>

      {/* Product Image Hero */}
      <View style={[styles.heroImage, { backgroundColor: product.color }]}>
        <Text style={styles.heroEmoji}>🛍️</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Tag */}
        <View style={styles.tagRow}>
          <View
            style={[
              styles.categoryTag,
              { backgroundColor: product.color + "22" },
            ]}
          >
            <Text style={[styles.categoryTagText, { color: product.color }]}>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Text>
          </View>
          <Text style={styles.soldBadge}>
            🔥 {product.sold.toLocaleString("id-ID")} terjual
          </Text>
        </View>

        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}
        <StarRating rating={product.rating} />

        {/* Price */}
        <Text style={styles.price}>{formatRupiah(product.price)}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>🚚</Text>
            <Text style={styles.infoLabel}>Gratis Ongkir</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>🔄</Text>
            <Text style={styles.infoLabel}>Bisa Retur 7 Hari</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>✅</Text>
            <Text style={styles.infoLabel}>Produk Original</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: product.color }]}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>🛒 Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    paddingVertical: 4,
  },
  backText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  heroImage: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  heroEmoji: {
    fontSize: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: "700",
  },
  soldBadge: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  productName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    lineHeight: 30,
    marginBottom: 10,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  star: {
    fontSize: 18,
    marginRight: 1,
  },
  ratingText: {
    fontSize: 13,
    color: "#888",
    marginLeft: 6,
  },
  price: {
    fontSize: 26,
    fontWeight: "900",
    color: "#6C63FF",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D2D2D",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
  ctaContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
  },
  ctaButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
