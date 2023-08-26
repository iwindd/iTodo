import React from 'react'
import { Text } from '@react-native-material/core'; // Import the FAB component
import { View, ScrollView } from 'react-native';
import { Button, IconButton, List } from 'react-native-paper';
import { useTodoContext } from '../contexts/todo';
import uuid from 'react-native-uuid';
import { ListItem, Button as ListButton } from '@rneui/themed';
import { Group } from '../typings/todo';
import Icon from 'react-native-vector-icons/FontAwesome';

function Index({ navigation }: any) {
    const { todos, Group } = useTodoContext();
    const [Groups, Dispatch] = Group();

    return (
        <View style={{ flexGrow: 1 }}>
            <ScrollView>
                {
                    Groups.length > 0 ? (
                        Groups.map((group: any) => {
                            return <>
                                <ListItem.Swipeable
                                    key={group.id}
                                    onPress={() => {
                                        navigation.navigate("group", {
                                            group: group,
                                            focus: false
                                        })
                                    }}
                                    rightContent={(reset) => (
                                        <ListButton
                                            title="Delete"
                                            onPress={() => {
                                                Dispatch({ type: "Remove", payload: group })
                                                reset()
                                            }}
                                            icon={{ name: 'delete', color: 'white' }}
                                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                        />
                                    )}
                                >
                                    <Icon name="folder" size={20} />
                                    <ListItem.Content>
                                        <ListItem.Title>{group.title}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem.Swipeable>
                            </>
                        })
                    ) : (
                        <View style={{
                            display: "flex",
                            marginTop: 16,
                            alignItems: "center"
                        }}>
                            <Text>ไม่พบรายการ</Text>
                        </View>
                    )
                }
            </ScrollView>

            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                backgroundColor: "white",
                padding: 5
            }}>
                <Button
                    icon="plus"
                    mode="text"
                    rippleColor={"rgba(0,0,0,0)"}
                    onPress={() => {
                        const payload: Group = {
                            id: uuid.v4(),
                            title: "รายการใหม่"
                        };

                        Dispatch({ type: "Add", payload: payload })
                        navigation.navigate("group", {
                            group: payload,
                            focus: true
                        })
                    }}
                >
                    รายการใหม่
                </Button>
            </View>
        </View>
    )
}

export default Index

