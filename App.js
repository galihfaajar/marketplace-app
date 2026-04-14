import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { CartProvider, useCart } from './utils/CartContext';
import HomeScreen from './app/HomeScreen';
import DetailScreen from './app/DetailScreen';
import CartScreen from './app/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartTabIcon({ color }) {
  const { totalItems } = useCart();
  return (
    <View style={{ position: 'relative' }}>
      <Text style={{ fontSize: 22, color }}>🛒</Text>
      {totalItems > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -6,
            backgroundColor: '#FF4757',
            borderRadius: 9,
            minWidth: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 9, fontWeight: '700' }}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#F0F0F0',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#AAA',
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({ color }) => <CartTabIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
