import React from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Text, Button } from '@react-native-material/core';
import { useTodoContext } from '../contexts/todo';
import { Status, statusLabel } from '../typings';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'

function EditScreen({ route, navigation }: any) {
    const { todo } = route.params;
    const [editedTitle, setEditedTitle] = React.useState<string>(todo.title);
    const [editedDescription, setEditedDescription] = React.useState<string>(todo.description);
    const [selectedStatus, setSelectedStatus] = React.useState<Status>(todo.status);
    const { updateTodo, deleteTodo } = useTodoContext();

    const [error, setError] = React.useState<{ id: string, msg: string } | null>(null);
    const IsError = (id: string) => {
        if (!error) return;

        if (error.id == id) {
            return <Text style={{
                color: "red",
                marginLeft: 16
            }}>{error.msg}</Text>
        }
    }

    const EditTodo = () => {
        // Update the todo with the edited values

        if (!editedTitle) {
            return setError({
                id: "title",
                msg: "กรุณาป้อนข้อมูลให้ถูกต้อง!"
            })
        }

        updateTodo({
            ...todo,
            title: editedTitle,
            description: editedDescription,
            status: selectedStatus,
        });

        navigation.navigate('Home');
    };

    const DeleteTodo = () => {
        Alert.alert(
            'แจ้งเตือน',
            'หากคุณทำการลบ คุณจะไม่สามารถย้อนคืน Todo ได้อีก คุณต้องการจะลบหรือไม่',
            [
                {
                    text: 'ยกเลิก',
                    style: 'cancel',
                },
                {
                    text: 'ยืนยัน',
                    style: 'default',
                    onPress: () => {
                        deleteTodo(todo.id);
                        navigation.navigate('Home');
                    }
                }
            ]
        )
    }

    return (
        <View
            style={{
                padding: 16,
                gap: 5
            }}
        >
            <TextInput
                label="หัวข้อ"
                value={editedTitle}
                onChangeText={text => setEditedTitle(text)}
                variant="outlined"
                maxLength={30}
            />
            {IsError("title")}
            <TextInput
                label="รายละเอียดเพิ่มเติม"
                value={editedDescription}
                onChangeText={text => setEditedDescription(text)}
                variant="outlined"
                multiline
                numberOfLines={4}
                maxLength={100}
            />

            <Text>สถานะ</Text>
            <SelectDropdown
                data={statusLabel}
                buttonStyle={{
                    width: "auto",
                    marginTop: 2,
                    borderWidth: 1,
                    borderRadius: 3
                }}
                onSelect={(selectedItem, index) => {
                    const selectIndex = index as Status;
                    setSelectedStatus(selectIndex)
                }}
                defaultValueByIndex={selectedStatus}
            />

            <Button
                onPress={EditTodo}
                leading={props => <Icon name="save" {...props} />}
                color='green'
                title="บันทึก"
            />

            <Button
                onPress={DeleteTodo}
                leading={props => <Icon name="trash" {...props} />}
                color='darkred'
                title="บันทึก"
            />
        </View>
    );
}

export default EditScreen;
