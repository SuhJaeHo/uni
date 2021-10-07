import React from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Roominfo({ route, navigation }) {

    const { sendd } = route.params;

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <View style={styles.l1Container}>
                        <View style={styles.category}>
                            <MaterialCommunityIcons
                                name={"soccer"}
                                style={{fontSize:60}}
                            />
                            <Text>{JSON.stringify(sendd.category).replace(/\"/gi, "")}</Text>  
                        </View>
                        <View style={styles.time}>                             
                            <Text style={styles.dateText}>{JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(0,8)}</Text>
                            <Text style={styles.timeText}>{JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(9)}</Text>
                        </View>
                    </View>
                    <View style={styles.l2Container}>
                        <View style={styles.title}>
                            <Text 
                                ellipsizeMode='tail' 
                                numberOfLines={2} 
                                style={styles.titleText}
                            >
                                {JSON.stringify(sendd.title).replace(/\"/gi, "")}
                            </Text>                             
                        </View>                        
                    </View>
                    <View style={styles.l3Container}>
                        <View style={styles.location}>                                                 
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.locationText}>{JSON.stringify(sendd.address).replace(/\"/gi, "")}</Text>                        
                        </View>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable style={styles.chatBtn}>
                        <Text style={styles.chatBtnText}>
                            Chat
                        </Text>
                    </Pressable>
                    <Pressable style={styles.editBtn}>
                        <Text style={styles.chatBtnText}>
                            Edit
                        </Text>
                    </Pressable>
                    <Pressable style={styles.delBtn}>
                        <Text style={styles.chatBtnText}>
                            Delete
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default Roominfo;