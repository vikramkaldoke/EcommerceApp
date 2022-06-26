import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/home/index';
import Auth from '../pages/auth';
import StartUp from '../pages/startUp/StartUp';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as authActions from '../store/actions/Auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Category from '../pages/category/Category';
import Cart from '../pages/cart/Cart';
import Profile from '../pages/profile/Profile';
import Color from '../constants/Color';
import Notification from '../pages/notification/Notification';
import MyOrders from '../pages/my_orders/MyOrders';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();

export default Navigation = () => {
  const isAuth = useSelector(state => !!state.auth.userId);
  const dispatch = useDispatch();

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    console.log('useData', userData);
    if (!userData) {
      SplashScreen.hide();
      // props.navigation.navigate('SignUp');
      return;
    }
    const transformedData = JSON.parse(userData);
    const {token, userId} = transformedData;
    dispatch(authActions.authenticate(userId, token));
    SplashScreen.hide();
  };

  useEffect(() => {
    tryLogin();
  }, []);

  function authScreenNav() {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}>
        {/* <AuthStack.Screen
          name="StartUp"
          component={StartUp}
          options={{
            headerShown: false,
          }}
        /> */}
        <AuthStack.Screen
          name="SignUp"
          component={Auth}
          // options={{
          //   headerShown: false,
          // }}
        />
      </AuthStack.Navigator>
    );
  }

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{
          // headerLeft: ({navigation}) => (
          //     <Icon name="bars" size={24} color="#fff" style={{marginLeft:10}} onPress={()=>  navigation?.openDrawer()} />
          //   ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen name="Details" component={Home} />
      </HomeStack.Navigator>
    );
  }

  function NotificationStackScreen() {
    return (
      <SettingsStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}>
        <SettingsStack.Screen
          name="myOrders"
          component={MyOrders}
          options={{
            headerShown: false,
          }}
        />
        {/* <SettingsStack.Screen name="Details" component={Home} /> */}
      </SettingsStack.Navigator>
    );
  }

  function tabNavigatorScreen() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Color.red,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Category}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            tabBarBadge: 1,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </DrawerContentScrollView>
    );
  }

  function drawerNavigatorScreen() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={tabNavigatorScreen} />
        <Drawer.Screen name="My Orders" component={NotificationStackScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {!isAuth && (
        <MainStack.Navigator>
          <MainStack.Screen
            name="Auth"
            component={authScreenNav}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      )}
      {isAuth && (
        <MainStack.Navigator initialRouteName="homePage">
          <MainStack.Screen
            name="homePage"
            component={drawerNavigatorScreen}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};
