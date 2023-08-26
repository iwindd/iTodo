import React from 'react'
import { Text, TextInput, Button, Divider } from 'react-native-paper'
import { View, ScrollView } from 'react-native';
import { useTodoContext } from '../../contexts/todo';
import { Group, statusIcons } from '../../typings';
import { ListItem, Button as ListButton } from '@rneui/themed';
import uuid from 'react-native-uuid'
import Icon from 'react-native-vector-icons/AntDesign';

function Index({ route: { params: { group: payload, focus } } }: any) {
    const { groupDispatch, todoDispatch, todos } = useTodoContext();

    const [Group, setGroup] = React.useState<Group>(payload);
    const [title, setTitle] = React.useState<string>(payload.title);
    const [isFocus, setFocus] = React.useState<boolean>(focus);

    const [isInsert, setInsertMode] = React.useState<boolean>(false);
    const [InsertVal, setInsertVal] = React.useState<string>("");

    return (
        <View style={{ flexGrow: 1 }}>
            <TextInput
                label="ชื่อรายการ"
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
                autoFocus={focus}
            />
            <Divider style={{ marginVertical: 15 }} />
            <ScrollView>
                {
                    todos.filter(todo => todo.group == Group.id).length > 0 ? (
                        todos.filter(todo => todo.group == Group.id).map((todo: any) => {
                            return <>
                                <ListItem.Swipeable
                                    key={todo.id}

                                    rightContent={(reset) => (
                                        <ListButton
                                            title="Delete"
                                            onPress={() => { }}
                                            icon={{ name: 'delete', color: 'white' }}
                                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                        />
                                    )}
                                >
                                    <Icon name={statusIcons[todo.status]} size={20} />
                                    <ListItem.Content>
                                        <ListItem.Title>{todo.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
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
                display: isFocus ? "none" : undefined,
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                padding: 0
            }}>
                {!isInsert ? (
                    <Button
                        icon="plus"
                        mode="text"
                        rippleColor={"rgba(0,0,0,0)"}
                        onPress={() => setInsertMode(true)}
                    >
                        เพิ่มงาน
                    </Button>
                ) : (
                    <TextInput
                        label="เพิ่มงาน"
                        value={InsertVal}
                        onChangeText={text => setInsertVal(text)}
                        autoFocus={isInsert}
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
                )}
            </View>
        </View>
    )
}

export default Index