import React from 'react'
import { Text } from '@react-native-material/core'; // Import the FAB component
import { View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useTodoContext } from '../contexts/todo';
import { ListItem, Icon, Button as ListButton } from '@rneui/themed';
import { Group, Todo } from '../typings';
import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid';

function Index({ navigation }: any) {
    const { groups: Groups, groupDispatch, todoDispatch, todos } = useTodoContext();
    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={{ flexGrow: 1 }}>
            <ScrollView>
                {
                    Groups.length > 0 ? (
                        Groups.map((group: Group) => {
                            return <ListItem.Swipeable
                                key={group.id as string}
                                leftWidth={0}
                                rightWidth={screenWidth / 6}
                                onPress={() => {
                                    navigation.navigate("group", {
                                        group: group,
                                        focus: false
                                    })
                                }}
                                rightContent={(reset) => (
                                    <ListButton
                                        title=""
                                        icon={{ name: 'delete', color: 'white' }}
                                        buttonStyle={{ minHeight: '100%', backgroundColor: '#F45050' }}
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
                                    />

                                )}
                            >
                                <Icon
                                    name="folder"
                                    type='fontawesome'
                                />
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
                    textColor='#19A7CE'
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

