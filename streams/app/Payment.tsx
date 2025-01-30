import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';

const PaymentScreen = () => {
    const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

  const paymentMethods = [
    { id: 1, name: 'Bank Transfer', icon: '🏦' },
    { id: 2, name: 'Mobile Money', icon: '📱' },
    { id: 3, name: 'Credit Card', icon: '💳' },
    { id: 4, name: 'PayPal', icon: '🔗' },
  ];

  const services = [
    { id: 1, name: 'Basic Plan', price: 'K15', description: 'Access to basic features' },
    { id: 2, name: 'Standard Plan', price: 'K20', description: 'Access to standard features' },
    { id: 3, name: 'Premium Plan', price: 'K25', description: 'Access to all features' },
  ];

const handlePayment = () => {
    navigation.navigate('Home');
};

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ThemedText style={styles.title}>Select Payment Method</ThemedText>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.method,
              {
                backgroundColor:
                  selectedMethod === method.id
                    ? colorScheme === 'dark'
                      ? Colors.app.primary
                      : Colors.app.primary
                    : colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background,
              },
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <ThemedText style={styles.methodText}>
              {method.icon} {method.name}
            </ThemedText>
          </TouchableOpacity>
        ))}

        <ThemedText style={styles.title}>Select Service</ThemedText>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.service,
              {
                backgroundColor:
                  selectedService === service.id
                    ? colorScheme === 'dark'
                      ? Colors.app.primary
                      : Colors.app.primary
                    : colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background,
              },
            ]}
            onPress={() => setSelectedService(service.id)}
          >
            <ThemedText style={styles.serviceText}>
              {service.name} - {service.price}
            </ThemedText>
            <ThemedText style={styles.serviceDescription}>
              {service.description}
            </ThemedText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <ThemedText style={styles.payButtonText}>Proceed to Pay</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  method: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  methodText: {
    fontSize: 18,
  },
  service: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 18,
  },
  serviceDescription: {
    fontSize: 14,
    color: 'gray',
  },
  payButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.app.primary,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PaymentScreen;