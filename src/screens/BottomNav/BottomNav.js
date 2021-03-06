import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Volunteer from './VolunteerScreen'
import { StatusBar } from 'react-native';
import Donor from './DonorScreen';
import Profile from './Profile'
import theme from '../GlobalStyles';
import { GetUser } from '../../TOKEN';
import UserContext from '../../UserContext.js'
console.disableYellowBox = true;

const Tab = createBottomTabNavigator();

const BottomNav = () => {


    const [TOKEN, SETTOKEN] = useState();

    const callUser = async () => {
        var USERTOKEN = await GetUser();
        SETTOKEN(USERTOKEN);

        console.log("huhahuhuahuahuha", a);
    }

    useEffect(() => {
        callUser
    }, [TOKEN])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor='#101010' />
            <UserContext.Provider value={TOKEN}>
                <Tab.Navigator lazy={true}
                    initialRouteName="Volunteer"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'Donor') {
                                if (focused) {
                                    return <Icon color={theme.accentColor} name="add-circle" type="material-icons" />;
                                } else {
                                    return <Icon color={theme.textColor} name="add-circle" type="material-icons" />;
                                }
                            } else if (route.name === 'Volunteer') {
                                if (focused) {
                                    return (
                                        <Icon color={theme.accentColor} name="home" type="material-icons" />
                                    );
                                } else {
                                    return <Icon color={theme.textColor} name="home" type="material-icons" />;
                                }
                            } else if (route.name === 'Profile') {
                                if (focused) {
                                    return (
                                        <Icon color={theme.accentColor} name="account-circle" type="material-icons" style={{ color: "green" }} />
                                    ); z
                                } else {
                                    return <Icon color={theme.textColor} name="account-circle" type="material-icons" />;
                                }
                            }
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: theme.accentColor,
                        inactiveTintColor: theme.textColor,
                        labelStyle: { fontFamily: 'ProductSans', fontSize: 14 },
                        showIcon: true,
                        style: { backgroundColor: theme.backgroundColor }
                    }}>
                    <Tab.Screen name="Volunteer" component={Volunteer} />
                    <Tab.Screen name="Donor" component={Donor} />
                    <Tab.Screen name="Profile" component={Profile} />

                </Tab.Navigator>
            </UserContext.Provider>
        </>
    );
}
export default BottomNav;