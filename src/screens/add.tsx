import React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper'; // Import components from react-native-paper
import { useTodoContext } from '../contexts/todo';
import { Status, statusLabel } from '../typings';
import { Button } from '@react-native-material/core';
import uuid from 'react-native-uuid';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddScreen({ navigation }: any) {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [selectedStatus, setSelectedStatus] = React.useState<Status>(0);
    const { addTodo } = useTodoContext();

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

    const handleAddTodo = () => {
        if (!title) {
            return setError({
                id: "title",
                msg: "กรุณาป้อนข้อมูลให้ถูกต้อง!"
            })
        }

        addTodo({
            id: uuid.v4(),
            title: title,
            description: description,
            status: selectedStatus
        })

        navigation.navigate('Home')
    };

    return (
        <View>
            <TextInput
                label="หัวข้อ"
                value={title}
                onChangeText={text => setTitle(text)}
                mode="outlined"
                style={{ margin: 16 }}
                keyboardType="default"
            />
            {IsError("title")}
            <TextInput
                label="รายละเอียดเพิ่มเติม"
                value={description}
                onChangeText={text => setDescription(text)}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={{ margin: 16 }}
            />

            <Text
                style={{ marginLeft: 17 }}
            >สถานะ</Text>
            <SelectDropdown
                data={statusLabel}
                buttonStyle={{
                    width: "auto",
                    margin: 16,
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
                leading={props => <Icon name="plus" {...props} />}
                onPress={handleAddTodo}
                color='green'
                style={{ margin: 16 }}
                title="เพิ่ม TODO"
            />

        </View>
    );
}

export default AddScreen;
