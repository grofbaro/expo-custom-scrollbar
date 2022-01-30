import React, {useState} from "react";
import {Dimensions, FlatList, View} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';

import styles from "./styles";

type HorizontalListParams = {
    data: Array<any>,
    renderItem: any,
    keyExtractor?: any,
    showIndicator?: boolean,
    cardWidthPercent?: number,
    indicatorStyle?: any,
    indicatorContainerStyle?: any,
}

const {width} = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HorizontalList = (props: HorizontalListParams) => {
    const {
        data,
        renderItem,
        keyExtractor,
        cardWidthPercent = 0.87,
        indicatorStyle,
        indicatorContainerStyle
    } = props;

    const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
    const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);
    const [scrollBarContainerWidth, setScrollBarContainerWidth] = useState(width)

    const translationX = useSharedValue(0);

    const scrollIndicatorSize = visibleScrollBarWidth > completeScrollBarWidth
        ? 0
        : visibleScrollBarWidth * scrollBarContainerWidth / completeScrollBarWidth;

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationX.value = event.contentOffset.x;
    });

    const animatedBarIndicatorStyle = useAnimatedStyle(() => {
        const x = translationX.value * scrollBarContainerWidth / completeScrollBarWidth;

        return {
            transform: [{translateX: x}]
        };
    });


    return (
        <View style={{flex: 1}}>
            <View >
                <AnimatedFlatList
                    horizontal
                    data={data}
                    renderItem={({item, index}) => renderItem(item)}
                    keyExtractor={(item, index) => keyExtractor(item, index)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    decelerationRate={"fast"}
                    scrollEventThrottle={16}
                    snapToInterval={width * cardWidthPercent + 12}
                    ItemSeparatorComponent={() => <View style={{height: 30, width: 12}}/>}
                    onScroll={scrollHandler}
                    onContentSizeChange={(width) => setCompleteScrollBarWidth(width)}
                    onLayout={e => setVisibleScrollBarWidth(e.nativeEvent.layout.width)}
                />
            </View>
            <View style={[styles.scrollBarContainer, indicatorContainerStyle]}
                  onLayout={e => setScrollBarContainerWidth(e.nativeEvent.layout.width)}>
                <Animated.View
                    style={[styles.scrollBarIndicator, {width: scrollIndicatorSize}, animatedBarIndicatorStyle, indicatorStyle]}/>
            </View>
        </View>
    )

}

export default HorizontalList;