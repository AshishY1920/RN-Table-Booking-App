import React, {lazy, Suspense, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Function to create a lazy-loaded screen
const lazyScreen = importFunc => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={<LoadingPlaceholder />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const Home = lazyScreen(() => import('../../Pages/Home'));
const Table = lazyScreen(() => import('../../Pages/ChooseTable'));
const Booking = lazyScreen(() => import('../../Pages/Booking'));
const Profile = lazyScreen(() => import('../../Pages/Profile'));
const Checkout = lazyScreen(() => import('../../Pages/Checkout'));

const LoadingPlaceholder = React.memo(() => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
    }}>
    <Text
      style={{
        color: '#000',
        fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
        fontSize: RFPercentage(2.5),
      }}>
      <ActivityIndicator size={RFPercentage(5)} color={'#86469C'} />
    </Text>
  </View>
));

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const HomeNavigator = React.memo(() => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // transitionSpec: {
        //   open: config,
        //   close: closeConfig,
        // },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen
        name="Restaurants"
        options={{headerShown: false}}
        component={Home}
      />
      <HomeStack.Screen
        name="ChooseTable"
        options={{
          headerTitleStyle: {
            fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
          },
        }}
        component={Table}
      />
      <HomeStack.Screen
        name="checkout"
        options={{
          headerTitleStyle: {
            fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
          },
        }}
        component={Checkout}
      />
    </HomeStack.Navigator>
  );
});

const BookingNavigator = React.memo(() => {
  return (
    <BookingStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // transitionSpec: {
        //   open: config,
        //   close: closeConfig,
        // },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <BookingStack.Screen
        name="Bookings"
        options={{headerShown: false}}
        component={Booking}
      />
    </BookingStack.Navigator>
  );
});

const ProfileNavigator = React.memo(() => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // transitionSpec: {
        //   open: config,
        //   close: closeConfig,
        // },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <ProfileStack.Screen
        name="Profiles"
        options={{headerShown: false}}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
});

const tabIcons = {
  Restaurant: {
    name: 'restaurant-outline',
    set: 'Ionicons',
  },
  Booking: {
    name: 'book-outline',
    set: 'Ionicons',
  },
  Profile: {
    name: 'user',
    set: 'AntDesign',
  },
  // Replace with the actual icon names for the Home tab
};
const CustomTabBar = React.memo(({state, descriptors, navigation}) => {
  const isOk = state.routes.some(route => route.name === 'Login');

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.Custom_Bar}>
        <View style={isOk ? styles.tab_bar : styles.tabBar}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : route.name;

            const isFocused = state.index === index;

            const viewRef = useRef(null);
            // const slideInAnimation = {
            //   from: {
            //     transform: [{scale: 0.9}],
            //   },
            //   to: {
            //     transform: [{scale: 1}],
            //   },
            // };
            const onPress = () => {
              // if (viewRef.current) {
              //   viewRef.current.animate(slideInAnimation, 500); // Trigger the animation on press
              // }
              if (viewRef.current) {
                viewRef.current
                  .flipInX(800)
                  .then(endState =>
                    console.log(
                      endState.finished
                        ? 'bounce finished'
                        : 'bounce cancelled',
                    ),
                  );
              }
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = tabIcons[route.name];
            const IconComponent =
              iconName.set === 'Ionicons' ? Icon : MaterialIcons;
            return (
              <TouchableOpacity
                key={route.name}
                activeOpacity={0.8}
                style={[styles.tabItem]}
                onPress={onPress}>
                <View
                  style={{
                    display: isOk ? 'none' : 'block',
                    alignItems: 'center',
                  }}>
                  <Animatable.View
                    ref={viewRef}
                    // animation={slideInAnimation}
                    // easing="ease-in-out-circ"
                  >
                    <IconComponent
                      style={[
                        styles.navigationIcon,
                        {
                          backgroundColor: isFocused
                            ? 'rgba(134, 70, 156, 0.1)'
                            : 'transparent',
                        },
                      ]}
                      name={iconName.name}
                      size={RFValue(19)}
                      color={isFocused ? '#86469C' : '#000'}
                    />
                  </Animatable.View>

                  <Text
                    style={{
                      color: isFocused ? '#86469C' : 'black',
                      fontFamily:
                        'HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521',
                      fontSize: RFPercentage(1.8),
                    }}>
                    {label}
                  </Text>
                </View>
                {/* {isFocused && (
                  <View
                    style={{
                      backgroundColor: '#86469C',
                      width: RFValue(5),
                      height: RFValue(5),
                      borderRadius: RFValue(50),
                      marginTop: RFValue(3),
                    }}></View>
                )} */}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
});

const Navigation = React.memo(() => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <Tab.Navigator
      shifting={true}
      sceneAnimationEnabled={false}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Restaurant"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* Add more tabs/screens as needed */}
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  Custom_Bar: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: RFValue(8),
    borderRadius: RFValue(50),
    shadowColor: '#607274',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 15,
    marginBottom: RFValue(15),
    paddingHorizontal: RFValue(10),
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  tab_bar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 0,
    borderRadius: RFValue(10),
    shadowColor: '#607274',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 15,
    marginBottom: RFValue(15),
    paddingHorizontal: RFValue(10),
    borderColor: '#EEEEEE',
    borderWidth: 1,
    // borderTopColor: '#F8DFF4',
    // borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationIcon: {
    width: RFValue(50),
    borderRadius: RFValue(50),
    height: RFValue(30),
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

export default Navigation;
