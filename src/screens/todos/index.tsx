import React from 'react'
import { ListItem, Button as ListButton, Icon } from '@rneui/themed';
import { Alert, View, Dimensions } from 'react-native';
import { useTodoContext } from '../../contexts/todo';
import { Todo, statusIcons } from '../../typings';
import { TextInput } from 'react-native-paper';

function Index({ route: { params: { todo, Group } }, navigation }: any) {
    const [Todo, setTodo] = React.useState<Todo>(todo);
    const { todoDispatch } = useTodoContext();
    const [description, setDescription] = React.useState<string>(todo.description);
    const screenWidth = Dimensions.get('window').width;

    return (
        <View>
            <ListItem.Swipeable
                leftWidth={0}
                rightWidth={screenWidth / 6}
                rightContent={(reset) => (
                    <ListButton
                        title=""
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: '#F45050' }}
                        onPress={() => {
                            Alert.alert(
                                'แจ้งเตือน',
                                `"${Todo.title}" จะถูกลบอย่างถาวร`,
                                [
                                    {
                                        text: 'ยกเลิก',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'ลบรายการ',
                                        style: 'default',
                                        onPress: () => {
                                            todoDispatch({ type: "Remove", payload: Todo })
                                            reset()

                                            navigation.navigate('group', {
                                                group: Group,
                                                focus: false
                                            })
                                        }
                                    }
                                ]
                            )
                        }}
                    />
                )}
            >
                <Icon
                    name={statusIcons[Todo.status]}
                    type='antdesign'
                    onPress={() => {
                        const nextStatus = Todo.status == 0 ? 2 : 0;
                        const payload: Todo = {
                            ...Todo,
                            ...{ status: nextStatus }
                        }


                        todoDispatch({ type: "Edit", payload: payload })
                        setTodo(payload);
                    }}
                    onLongPress={() => {
                        const payload: Todo = {
                            ...Todo,
                            ...{ status: 1 }
                        }

                        todoDispatch({ type: "Edit", payload: payload })
                        setTodo(payload)
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title>{todo.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
            <TextInput
                label="หมายเหตุ"
                mode={"flat"}
                value={description}
                onChangeText={text => setDescription(text)}
                maxLength={20}
                style={{
                    backgroundColor: "rgba(0, 255, 255, 0)",
                    margin: 5
                }}
                onBlur={() => {
                    const payload: Todo = {
                        ...todo,
                        ...{ description: description }
                    }

                    todoDispatch({ type: "Edit", payload: payload })
                }}
            />
        </View>
    )
}

export default Index