import React from 'react';
import { Text, ListItem, Button } from '@react-native-material/core'; // Import the FAB component
import { View, ScrollView } from 'react-native';
import { useTodoContext } from '../contexts/todo';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen({ navigation }: any) {
    const { todos } = useTodoContext();

    return (
        <View style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    todos.length > 0 ? (
                        todos.map((todo) => {
                            return <ListItem
                                key={todo.id}
                                title={todo.title}
                                secondaryText={todo.description || "ไม่มีรายละเอียดเพิ่มเติม"}
                                onPress={() => navigation.navigate('Edit', { todo })}
                                leading={
                                    todo.status == 0 ? (
                                        <Icon name='pause' size={25}></Icon>
                                    ) : todo.status == 1 ? (
                                        <Icon name='spinner' size={25} color='blue'></Icon>
                                    ) : (
                                        <Icon name='check' size={25} color='green'></Icon>
                                    )
                                }
                            />
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

            <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <Button
                    title='เพิ่ม'
                    leading={props => <Icon name="plus" {...props} />}
                    onPress={() => navigation.navigate('Add')}
                ></Button>
            </View>
        </View>
    );
}

export default HomeScreen;
