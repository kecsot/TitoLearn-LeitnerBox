import React, {useState} from "react";
import {Drawer} from "expo-router/drawer";
import auth from "@react-native-firebase/auth";
import {Card, Icon, IconButton, Text} from "react-native-paper";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {View} from "react-native";
import {globalStyleConfig} from "../../../../../src/components/base/globalStyleConfig";
import {useTheme} from "@react-navigation/native";
import DeleteUserButtonContainer from "../../../../../src/containers/user/DeleteUserButtonContainer";
import Toast from "react-native-toast-message";

export default function Layout() {
    const theme = useTheme();
    const [isAccepted, setAccepted] = useState(false);
    const [isErrorHappened, setErrorHappened] = useState(false);
    const user = auth().currentUser;

    const handleOnDeleted = () => {
        Toast.show({
            text1: 'Your account has been deleted.',
        })
        void auth().signOut()
    }

    const handleOnDeleteError = () => {
        Toast.show({
            text1: 'There was an error while deleting the account.',
            text2: 'Please follow the information below.',
        })
        setErrorHappened(true)
    }

    const onToggle = () => setAccepted(!isAccepted);

    return (
        <ScreenView>
            <Drawer.Screen
                options={{
                    title: 'Account deletion',
                }}
            />
            <Card>
                <Card.Title
                    left={() => (<Icon color={'red'} source={'alert'} size={28}/>)}
                    title={"ALERT"}
                    titleVariant={'headlineSmall'}/>
                <Card.Content style={{
                    gap: 8
                }}>
                    <Text
                        variant={'bodyLarge'}>
                        Are you sure want to delete your account?
                    </Text>
                    <Text>
                        You are logged in as: {user?.email}
                    </Text>
                    <View style={styles.liContainer}>
                        <Text style={styles.li}>
                            - This action cannot be undone.
                        </Text>
                        <Text style={styles.li}>
                            - All of your data will be deleted.
                        </Text>
                        <Text style={styles.li}>
                            - Unable to restore account after deleting.
                        </Text>
                        <Text style={styles.li}>
                            - Your account will be deleted.
                        </Text>
                        <Text style={styles.liAlert}>
                            If you has auto-renewable subscription, your billing will continue through Apple.
                        </Text>
                        <Text style={styles.liAlert}>
                            Please first cancel your subscription before continuing!
                        </Text>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <IconButton
                            icon="check"
                            mode='outlined'
                            size={14}
                            iconColor={isAccepted ? theme.colors.primary : 'transparent'}
                            onPress={onToggle}
                            style={{
                                marginHorizontal: globalStyleConfig.gap,
                                borderRadius: globalStyleConfig.gap,
                            }}
                        />
                        <Text style={{
                            width: '85%'
                        }}>
                            I agree to delete my account and all data forever!
                        </Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <DeleteUserButtonContainer
                        enabled={isAccepted}
                        onSuccess={handleOnDeleted}
                        onError={handleOnDeleteError}
                    />
                </Card.Actions>
            </Card>

            {isErrorHappened && (
                <Text>
                    There was an error while deleting the account. Please contact us to request a manual delete!
                    info@titolearn.com
                </Text>
            )}

        </ScreenView>
    );
}

const styles = {
    liContainer: {
        gap: 8,
        margin: 4
    },
    liAlert: {
        color: '#FF3333',
    },
    li: {
        opacity: .7
    }
}