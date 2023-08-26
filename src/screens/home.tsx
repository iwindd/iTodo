import React from 'react'
import { Text } from '@react-native-material/core'; // Import the FAB component
import { View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useTodoContext } from '../contexts/todo';
import { ListItem, Button as ListButton } from '@rneui/themed';
import { Group, Todo } from '../typings';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';

function Index({ navigation }: any) {
    const { groups: Groups, groupDispatch, todoDispatch, todos } = useTodoContext();

    return (
        <View style={{ flexGrow: 1 }}>
            <ScrollView>
                {
                    Groups.length > 0 ? (
                        Groups.map((group: any, index) => {
                            return <ListItem.Swipeable
                                key={index}
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
                                            Alert.alert(
                                                'แจ้งเตือน',
                                                `"${group.title}" จะถูกลบอย่างถาวร`,
                                                [
                                                    {
                                                        text: 'ยกเลิก',
                                                        style: 'cancel',
                                                    },
                                                    {
                                                        text: 'ลบรายการ',
                                                        style: 'default',
                                                        onPress: () => {
                                                            groupDispatch({ type: "Remove", payload: group })
                                                            todoDispatch({ type: "Removes", group: group.id })
                                                            reset()
                                                        }
                                                    }
                                                ]
                                            )
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
                                <ListItem.Subtitle>
                                    #{todos.filter((todo: Todo) => todo.group == group.id).length}
                                </ListItem.Subtitle>
                            </ListItem.Swipeable>
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

                        groupDispatch({ type: "Add", payload: payload })
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

