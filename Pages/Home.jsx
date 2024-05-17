import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import * as Animatable from 'react-native-animatable';
import Header from '../Components/Header/Header';
import HeaderStyle from '../Components/Header/HeaderStyle/HeaderStyle';
import Restaurant from '../Components/Restaurants/Restaurant';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import NoDataFound from '../Components/NoDataFound/NoDataFound';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetAllCategoriesActions,
  GetAllrestaurantActions,
} from '../Actions/RestaurantActions';
import Loading from '../Components/Loading/Loading';
import Categories from '../Components/Categories/Categories';
import RestaurantStyle from '../Components/Restaurants/RestaurantStyle/RestaurantStyle';
import SkeletonStyle from '../Components/Skeleton/Skeleton';
import {RFValue} from 'react-native-responsive-fontsize';

// const categories = [
//   {
//     id: 1,
//     img: require('../assets/Icons/pizza.jpg'),
//     title: 'Pizza',
//   },
//   {
//     id: 2,
//     img: require('../assets/Icons/pepsi.jpg'),
//     title: 'Cold Drinks',
//   },
//   {
//     id: 3,
//     img: require('../assets/Icons/biryani.jpg'),
//     title: 'Biryani',
//   },
//   {
//     id: 4,
//     img: require('../assets/Icons/chicken.jpg'),
//     title: 'Chicken',
//   },
//   {
//     id: 5,
//     img: require('../assets/Icons/ice-cream.jpg'),
//     title: 'Ice Cream',
//   },
//   {
//     id: 6,
//     img: require('../assets/Icons/sweets.jpg'),
//     title: 'Sweets',
//   },
// ];

const Home = () => {
  const dispatch = useDispatch();

  // Get All Restaurant State
  const {restaurants, loading} = useSelector(state => state.AllRestaurants);

  const isFocused = useIsFocused();
  const [restaurantData, setRestaurantData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [totalPage, setTotalPage] = useState(null);
  const [isLength, setIsLength] = useState(null);

  const [search, setSearch] = useState(null);

  const fetchData = useCallback(
    async (search, currentPage) => {
      // console.log('CURRENT PAGE: ', currentPage);
      if (isLoading || (totalPage !== null && currentPage > totalPage)) return; // Prevent multiple simultaneous requests
      setIsLoading(true);
      try {
        let url = `https://restaurant-app-server-three.vercel.app/api/v1/get-restaurant?page=${currentPage}`;

        // console.log('SEARCH: ', search);
        if (search !== '' && search !== undefined && search !== null) {
          url += `&search=${search}`;
        }

        // console.log('PAGE: ', currentPage);

        const response = await axios.get(url);
        const newData = response?.data?.data || [];
        setRestaurantData(prev => {
          const uniqueData = newData.filter(
            item => !prev.some(prevItem => prevItem._id === item._id),
          ); // Assuming each item has a unique identifier 'id'
          return [...prev, ...uniqueData];
        });
        setTotalPage(response?.data?.pagination?.totalPage);
        setPage(currentPage + 1);

        setIsLength(response?.data?.data?.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setIsLoading(false);
    },
    [totalPage, isLoading],
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="#86469C" />
      </View>
    ) : null;
  };

  const handleSearch = search => {
    setTotalPage(null);
    setPage(1);
    setSearch(search);
    fetchData(search, 1);
    setRestaurantData([]);
  };

  const handleBack = () => {
    setSearch(null);
    setTotalPage(null);
    setPage(1);
    setIsLength(null);
    fetchData(null, 1);
  };

  const [isNull, setIsNull] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsNull(true);
    setSearch(null);
    handleBack();
    setIsRefreshing(true);
    await dispatch(GetAllrestaurantActions(1));
    dispatch(GetAllCategoriesActions());
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isFocused) {
      setPage(1);
      setTotalPage(null);
    } else {
      fetchData(search, page);
    }
  }, [page, isFocused]);

  // Get All Categories State
  const {categories, loading: categoriesLoading} = useSelector(
    state => state.category,
  );

  useEffect(() => {
    dispatch(GetAllCategoriesActions());
  }, [dispatch]);

  useEffect(() => {
    if (restaurants && restaurants?.status === 1) {
      setRestaurantData(restaurants && restaurants?.data);
    }
  }, [restaurants]);

  // const viewRef = useRef(null);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (isRefreshing) {
      setLoad(true);
    }
    if (!categoriesLoading) {
      setTimeout(() => {
        setLoad(false);
      }, 5000);
    }
    if (!loading) {
      setTimeout(() => {
        setLoad(false);
      }, 5000);
    }
  }, [categoriesLoading, loading, isRefreshing]);

  // useEffect(() => {
  //   if (viewRef.current && !load) {
  //     viewRef.current
  //       .fadeIn(800)
  //       .then(endState =>
  //         console.log(
  //           endState.finished ? 'bounce finished' : 'bounce cancelled',
  //         ),
  //       );
  //   }
  // }, [load]);

  return (
    <View style={[HeaderStyle.Container, {flex: 1, backgroundColor: 'white'}]}>
      {/* <Animatable.View ref={viewRef}> */}
      <Header
        handleSearch={handleSearch}
        searchNull={isNull}
        setIsNull={setIsNull}
        handleBack={handleBack}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#86469C', '#86469C']}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }>
        {/* Categories Component starts here */}
        <View style={{height: RFValue(84)}}>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <Categories
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  img={item.image.url}
                  loading={load}
                />
              );
            }}
          />
        </View>
        {/* Categories Component ends here */}

        {/* Restaurant Component starts here */}
        {/* {loading ? (
          <Loading />
        ) : ( */}
        <>
          {isLength === 0 && isLength !== null ? (
            <NoDataFound top={true} title="No Restaurants Found." />
          ) : (
            <FlatList
              nestedScrollEnabled={false}
              scrollEnabled={false}
              renderItem={({item}) => {
                return (
                  <Restaurant
                    id={item._id}
                    key={item._id}
                    image={item?.image?.url}
                    name={item.RestaurantName}
                    desc={item.description}
                    address={item.address}
                    loading={load}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              data={restaurantData}
              keyExtractor={item => item._id}
              onEndReached={() => fetchData('', page)}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
            />
          )}
        </>
        {/* )} */}
        {/* Restaurant Component starts here */}
      </ScrollView>
      {/* </Animatable.View> */}
    </View>
  );
};

export default Home;
