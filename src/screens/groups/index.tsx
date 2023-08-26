import React from 'react'
import { Text, Button } from 'react-native-paper'
import { View, ScrollView, Alert, TextInput as Input, Dimensions } from 'react-native';
import { useTodoContext } from '../../contexts/todo';
import { Group, Todo, statusIcons } from '../../typings';
import { ListItem, Button as ListButton, Icon } from '@rneui/themed';
import uuid from 'react-native-uuid';

const TodoItem = ({ todo, Group, navigation }: {
    todo: Todo,
    Group: Group,
    navigation: any
}) => {
    const { todoDispatch } = useTodoContext();
    const screenWidth = Dimensions.get('window').width;

    return <ListItem.Swipeable
        leftWidth={0}
        rightWidth={screenWidth/6}
        onPress={() => {
            navigation.navigate("todo", {
                todo, Group
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
                        `"${todo.title}" จะถูกลบอย่างถาวร`,
                        [
                            {
                                text: 'ยกเลิก',
                                style: 'cancel',
                            },
                            {
                                text: 'ลบรายการ',
                                style: 'default',
                                onPress: () => {
                                    todoDispatch({ type: "Remove", payload: todo })
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
            name={statusIcons[todo.status]}
            type='antdesign'
            onPress={() => {
                const nextStatus = todo.status == 0 ? 2 : 0;
                todoDispatch({
                    type: "Edit", payload: {
                        ...todo,
                        ...{ status: nextStatus }
                    }
                })
            }}
            onLongPress={() => {
                todoDispatch({
                    type: "Edit", payload: {
                        ...todo,
                        ...{ status: 1 }
                    }
                })
            }}
        />

        <ListItem.Content>
            <ListItem.Title>{todo.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Subtitle>
            {todo.description}
        </ListItem.Subtitle>
        <ListItem.Chevron />
    </ListItem.Swipeable>
}

function Index({ route: { params: { group: payload, focus } }, navigation }: any) {
    const { groupDispatch, todoDispatch, todos } = useTodoContext();

    const [Group, setGroup] = React.useState<Group>(payload);
    const [title, setTitle] = React.useState<string>(payload.title);
    const [isFocus, setFocus] = React.useState<boolean>(focus);

    const [isInsert, setInsertMode] = React.useState<boolean>(false);
    const [InsertVal, setInsertVal] = React.useState<string>("");

    const [expand, setExpand] = React.useState<boolean[]>([true, true, true])
    const toggleExpand = (sectionId: 0 | 1 | 2) => {
        setExpand(prevExpand => ({
            ...prevExpand,
            [sectionId]: !prevExpand[sectionId]
        }));
    };


    return (
        <View style={{ flexGrow: 1 }}>
            <Input
                value={title}
                onChangeText={text => setTitle(text)}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    setFocus(false)
                    const payload: Group = {
                        ...Group,
                        ...{ title: title }
                    }
                    groupDispatch({ type: "Edit", payload: payload })
                    setGroup(payload)
                }}
                maxLength={20}
                autoFocus={focus}
                style={{
                    margin: 5,
                    fontSize: 30,
                    color: "black"
                }}
            ></Input>
            <ScrollView>
                {
                    todos.filter(todo => todo.group == Group.id).length > 0 ? (
                        <View>
                            {
                                todos.filter(todo => todo.group == Group.id && todo.status == 0).map((todo: Todo) => {
                                    return <TodoItem key={todo.id as string} todo={todo} Group={Group} navigation={navigation} />
                                })
                            }
                            <ListItem.Accordion
                                style={{
                                    display: todos.filter(todo => todo.group == Group.id && todo.status == 1).length <= 0 ? "none" : undefined
                                }}
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title>กำลังดำเนินการ</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={expand[1]}
                                onPress={() => toggleExpand(1)}
                            >
                                {
                                    todos.filter(todo => todo.group == Group.id && todo.status == 1).map((todo: Todo) => {
                                        return <TodoItem key={todo.id as string} todo={todo} Group={Group} navigation={navigation} />
                                    })
                                }
                            </ListItem.Accordion>
                            <ListItem.Accordion
                                style={{
                                    display: todos.filter(todo => todo.group == Group.id && todo.status == 2).length <= 0 ? "none" : undefined
                                }}
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title>เสร็จแล้ว</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={expand[2]}
                                onPress={() => toggleExpand(2)}
                            >
                                {
                                    todos.filter(todo => todo.group == Group.id && todo.status == 2).map((todo: Todo, index) => {
                                        return <TodoItem key={todo.id as string} todo={todo} Group={Group} navigation={navigation} />
                                    })
                                }
                            </ListItem.Accordion>
                        </View>
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
                display: isFocus ? "none" : undefined,
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                backgroundColor: "white",
                
                padding: 5
            }}>
                {!isInsert ? (
                    <Button
                        icon="plus"
                        mode="text"
                        rippleColor={"rgba(0,0,0,0)"}
                        textColor='#19A7CE'
                        onPress={() => setInsertMode(true)}
                    >
                        เพิ่มงาน
                    </Button>
                ) : (
                    <View>
                        <Input
                            placeholder="เพิ่มงาน"
                            value={InsertVal}
                            onChangeText={text => setInsertVal(text)}
                            autoFocus={isInsert}
                            multiline={false}
                            onBlur={() => {
                                setInsertMode(false)
                                if (InsertVal.length > 0) {
                                    setInsertVal("");
                                    todoDispatch({
                                        type: "Add", payload: {
                                            id: uuid.v4(),
                                            group: Group.id,
                                            title: InsertVal,
                                            status: 0
                                        }
                                    })
                                }
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default Index