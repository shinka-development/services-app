import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfessionalButon from '../../components/ui/ProfessionalButon';
import Service24h from '../../components/ui/Service-24h';
import RecentServices from '../../components/ui/RecentServices';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            {/* Top Row: Location + Notification */}
            <View style={styles.topRow}>
              <View style={styles.locationWrapper}>
                <Ionicons name="location-sharp" size={20} color="white" />
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationLabel}>UBICACIÓN ACTUAL</Text>
                  <View style={styles.locationSelector}>
                    <Text style={styles.locationValue}>Palermo, Buenos Aires</Text>
                    <Ionicons name="chevron-down" size={12} color="white" style={styles.chevron} />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="white" />
                <View style={styles.badge}>
                  <View style={styles.badgeDot} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={styles.headerTitle}>
              ¿Qué servicio necesitás{'\n'}arreglar hoy?
            </Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#137FEC" style={styles.searchIcon} />
              <TextInput
                placeholder="Buscar 'plomero', 'gasista'..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="options-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfessionalButon />
        <Service24h />
        <RecentServices />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light gray background for body
  },
  header: {
    backgroundColor: '#137FEC',
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTextContainer: {
    justifyContent: 'center',
  },
  locationLabel: {
    color: '#E0F2FE', // Light blue-white
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444', // Red
    borderWidth: 1.5,
    borderColor: '#137FEC', // Matches header background for blending
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    lineHeight: 32,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    height: '100%',
  },
  filterButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
