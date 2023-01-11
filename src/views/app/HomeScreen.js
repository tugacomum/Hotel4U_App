import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/index'
import { api } from '../../services/api';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import hotels from '../../consts/hotels';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

LogBox.ignoreAllLogs();

const HomeScreen = ({ navigation }) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const CategoryList = () => {
    return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 3,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                    alignSelf: 'center'
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = ({ hotel, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...style.cardOverLay, opacity }} />
          <View style={style.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
              ${hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  {hotel.name}
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {hotel.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>365 reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopHotelCard = ({ hotel }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <View style={style.topHotelCard}>
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 1,
              flexDirection: 'row',
            }}>
            <Icon name="star" size={15} color={COLORS.orange} />
            <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 15 }}>
              5.0
            </Text>
          </View>
          <Image style={style.topHotelCardImage} source={hotel.image} />
          <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{hotel.name}</Text>
            <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
              {hotel.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [isLoadingDone, setLoadingDone] = useState(false);
  const [data, setData] = useState([]);
  async function getData() { 
    try {
      const response = await api.get('hotels').then(r => r.data);
      setData(response)
    } catch (err) {
      console.log("Err: " + err)
    } finally {
      setTimeout(()=> {
        setLoadingDone(true);
      }, 500);
    }
  }
  useEffect(()=>{
    getData();
  }, [])
  if (!isLoadingDone) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Loader size="large" />
        </View>
    )
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={style.header}>
          <View style={{ paddingBottom: 15 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              Find your hotel
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>in </Text>
              <Text
                style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.primary }}>
                Portugal
              </Text>
  
            </View>
          </View>
          <Image source={require('../../assets/icon.png')} color={COLORS.dark} style={{
            width: 70.03,
            height: 69.14,
            marginRight: 5,
            bottom: 5
          }}></Image>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.searchInputContainer}>
            <Icon name="search" size={30} style={{ marginLeft: 20 }} />
            <TextInput
              placeholder="Search"
              style={{ fontSize: 20, paddingLeft: 10 }}
            />
          </View>
          <CategoryList />
          <View>
            <Animated.FlatList
              onMomentumScrollEnd={(e) => {
                setActiveCardIndex(
                  Math.round(e.nativeEvent.contentOffset.x / cardWidth),
                );
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              horizontal
              data={hotels}
              contentContainerStyle={{
                paddingVertical: 30,
                paddingLeft: 20,
                paddingRight: cardWidth / 2 - 40,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <Card hotel={item} index={index} />}
              snapToInterval={cardWidth}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.grey }}>
              Top hotels
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('HotelsScreen')}><Text style={{ color: COLORS.grey }}>Show all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={hotels}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 20,
            }}
            renderItem={({ item }) => <TopHotelCard hotel={item} />}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontWeight: 'bold',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HomeScreen;