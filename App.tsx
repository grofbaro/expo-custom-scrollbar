import {StatusBar} from 'expo-status-bar';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HorizontalList from "./src/components/HorizontalList/HorizontalList";

const {width} = Dimensions.get('window');

const names: string[] = ['James', 'John', 'Amanda', 'Taylor']

export default function App() {
    const renderItem = (item: string) => {
        return <View style={styles.listItemContainer}>
            <Text style={styles.name}>{item}</Text>
        </View>
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 20}}>
                <HorizontalList
                    data={names}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item}
                    indicatorStyle={styles.indicatorStyle}
                    indicatorContainerStyle={styles.indicatorStyleContainer}
                    cardWidthPercent={0.8}/>
            </View>
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b0bec5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: '#90a4ae',
        borderRadius: 8
    },
    indicatorStyleContainer: {
        backgroundColor: '#546e7a',
        height: 10
    },
    indicatorStyle: {
        height: 10,
        backgroundColor: '#37474f'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});
