import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Volunteer from '../VolunteerScreen'
import Donor from '../DonorScreen';
import Profile from '../Profile/Profile'
import theme from '../GlobalStyles';
import { GetUser } from '../../GetUser';


const Tab = createBottomTabNavigator();

const BottomNav = () => {



    const [User, setUser] = useState([]);

    const callUser = async () => {
        console.log("lol");
        const a = await GetUser();
        if (a === null || undefined || " ") {
            a = "nope";
        }
        setUser(a.split("@"))
        console.log("User is in ", a);

    }

    useEffect(() => {
        callUser
    }, [User])

    return (
        <>
            <Tab.Navigator lazy={true}
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
                                );
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
                <Tab.Screen name="Donor" component={Donor} initialParams={{ User: User }} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </>
    );
}
export default BottomNav;