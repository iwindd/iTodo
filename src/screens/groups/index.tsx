import React from 'react'
import { Text, TextInput, Button } from 'react-native-paper'
import { View } from 'react-native';

function Index({ route: { params: { group, focus } } }: any) {
    const [title, setTitle] = React.useState<string>(group.title);
    const [isFocus, setFocus] = React.useState<boolean>(focus);

    return (
        <View style={{ flexGrow: 1 }}>
            <TextInput
                label="ชื่อรายการ"
                value={title}
                onChangeText={text => setTitle(text)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                autoFocus={focus}
            />
            <View style={{
                display: isFocus ? "none" : undefined,
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                marginBottom: 15,
                padding: 0
            }}>
                <Button
                    icon="plus"
                    mode="text"
                    rippleColor={"rgba(0,0,0,0)"}
                    onPress={() => {
                        
                    }}
                >
                    เพิ่มงาน
                </Button>
            </View>
        </View>
    )
}

export default Index