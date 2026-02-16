import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RatingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Calificar Servicio', headerBackVisible: false }} />
      
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={80} color="#22C55E" />
        <Text style={styles.title}>¡Servicio Finalizado!</Text>
        <Text style={styles.subtitle}>¿Cómo estuvo el servicio de Juan Pérez?</Text>
        
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons key={star} name="star-outline" size={40} color="#FFD700" style={{ marginHorizontal: 5 }} />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/Reservas')}>
          <Text style={styles.buttonText}>Enviar Calificación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#137FEC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
