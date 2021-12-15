import React from 'react';
import {View, Text, PermissionsAndroid, Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import SplashScreen from  "react-native-splash-screen";
//import {mapStyle} from '../../constants/mapStyle';

async function requestPermissions() {
  SplashScreen.hide();
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization("whenInUse");
    if(auth === "granted") {
       // do something if granted...
    }
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if ("granted" === PermissionsAndroid.RESULTS.GRANTED)  {
      // do something if granted...
    }
  }
}

async function splash(){
  React.useEffect(() => {
    SplashScreen.hide();
  }); 
}

export default class Map extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
    };
  }

 
  
  async componentDidMount() {
    //await splash()
    await requestPermissions()
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );

    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      },
    );
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{ fontSize: 14, marginHorizontal:10, fontFamily: 'arial' }}>
          Red markers denotes interesting places {'\n'}
          Blue markers denotes the location of public services
        </Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          showsUserLocation={true}
          showsTraffic={true}
          initialRegion={{
            latitude: -6.175392,
            longitude:  106.827153,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onRegionChangeComplete={this.onRegionChange}
          >
            
           <Marker
            coordinate={{ latitude:  -6.175392, longitude: 106.827153 }}
            title='National Monument'
            description='A 132 m obelisk symbolizing the fight for Indonesia'
          ></Marker >
           <Marker
            coordinate={{ latitude:  -6.176391198173074, longitude: 106.83056508178821 }}
            title='Gambir Station'
            description='A major railway station serving Executive Class trains'
            pinColor='blue'
          ></Marker >
           <Marker
            coordinate={{ latitude:  -6.174628996635667, longitude: 106.84433408539638 }}
            title='Pasar Senen Station'
            description='A major railway station serving Economy Class trains'
            pinColor='blue'
          ></Marker >
             <Marker
            coordinate={{ latitude:  -6.219891810327927, longitude: 106.66393968113009 }}
            title='IKEA Alam Sutera'
            description='Scandinavian chain selling ready-to-assemble furniture'
          ></Marker >
             <Marker
            coordinate={{ latitude:  -6.304994613362785, longitude:106.6440510388008}}
            title='AEON Mall BSD City'
            description='A large Japanese shopping mall'
          ></Marker >
             <Marker
            coordinate={{ latitude:  -6.176540760775009, longitude: 106.82148280860513}}
            title='National Museum'
            description='Museum containing historical & archaeological exhibits'
          ></Marker >
          <Marker
            coordinate={{ latitude:  -6.134566129369865, longitude: 106.81443835443098}}
            title='Jakarta Old Town'
            description=' A neighborhood comprising the original downtown of Jakarta'
          ></Marker >
           <Marker
            coordinate={{ latitude:  -6.09047566179927, longitude: 106.74474824299458}}
            title='Pantjoran Chinatown PIK'
            description=' A modern chinatown near the coast'
          ></Marker >
           <Marker
            coordinate={{ latitude:  -6.124971032771966, longitude: 106.83376300251794}}
            title='Dunia Fantasi'
            description=' Large theme park with interactive rides'
          ></Marker >
          <Marker
            coordinate={{ latitude:  -6.126777633925925, longitude: 106.65412468479028}}
            title='Soekarno-Hatta International Airport'
            description='The international airport of Jakarta'
            pinColor='blue'
          ></Marker >
          <Marker
            coordinate={{ latitude:  -6.300309891040132, longitude:106.65397454854985}}
            title='The Breeze'
            description='Outdoor open-air mall'
          ></Marker >
          <Marker
            coordinate={{ latitude:  -6.250649959488098, longitude:106.6258418448469}}
            title='Prodia Gading Serpong'
            description='Get your COVID-19 tests here'
          ></Marker >
           <Marker
            coordinate={{ latitude:  -6.311761868692998, longitude:106.82120509147353}}
            title='Ragunan Zoo'
            description='A 363-acre zoo in the rainforest'
          ></Marker >
          <Marker
            coordinate={{ latitude:  -6.224388149354934, longitude:106.81120381415936}}
            title='Sudirman Central Business District'
            description='A lively business district in the heart of Jakarta'
          ></Marker >
          <Marker
            coordinate={{ latitude: -6.19475719109877, longitude:106.82325818902609}}
            title='Hotel Indonesia Roundabout'
            description='A well-known roundabout in Jakarta CBD'
          ></Marker >
           <Marker
            coordinate={{ latitude:-6.142462485151228, longitude:106.81328988421257}}
            title='Glodok'
            description='The old chinatown of Jakarta'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.228356247395191, longitude:106.6114396964317}}
            title='Pelita Harapan University'
            description='A private Christian university in Tangerang'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.157074590519956, longitude: 106.90912367129818}}
            title='Kelapa Gading Mall'
            description='One of the largest shopping malls in Indonesia'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.177069932341652, longitude: 106.79111217923649}}
            title='Central Park Mall'
            description='Iconic shopping mall with a park in the center'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.239710544172683, longitude: 106.81249250040092}}
            title='Santa Modern Market'
            description='A place for thrift shopping'
          ></Marker >
            <Marker
            coordinate={{ latitude:-6.177654631428022, longitude: 106.63040530622104}}
            title='Pasar Lama Tangerang'
            description='A lively culinary market on the streets'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.302371247477637, longitude: 106.89558505040122}}
            title='Taman Mini Indonesia Indah'
            description='A theme park bringing Indonesian culture to life'
          ></Marker >
             <Marker
            coordinate={{ latitude:-6.230166662388121, longitude:106.80723693744137}}
            title='Senopati Night Area'
            description='When night falls, this neighbourhood comes to life'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.164867593695842, longitude:106.83454128902592}}
            title='Pasar Baru'
            description='A street market dating back to the Dutch colonial era'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.241432377835171, longitude:106.65147887738546}}
            title='The Flavor Bliss'
            description='An American-themed culinary center'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.231886986812263, longitude:106.63391613505725}}
            title='Wing Heng Gading Serpong'
            description='The famous 24 hour dimsum shop'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.185042305504107, longitude: 106.77802585992656}}
            title='Museum MACAN'
            description='Museum for modern & contemporary art'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.187047582047588, longitude:106.73790001368701}}
            title='Lippo Mall Puri'
            description='A lively mall in West Jakarta'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.190794968984335, longitude:106.89029477368247}}
            title='Jakarta International Velodrome'
            description='A sporting facility located in East Jakarta'
          ></Marker >
           <Marker
            coordinate={{ latitude:-6.1247666140760835, longitude:106.86054693267253}}
            title='Jakarta International Stadium'
            description='A newly built stadium in North Jakarta'
          ></Marker >
            <Marker
            coordinate={{ latitude:-6.202202160076071, longitude:106.82316519751143}}
            title='Dukuh Atas Transit Area'
            description='A transit point for KRL, MRT, and Airport Train'
          ></Marker >
          <Marker
            coordinate={{ latitude:-6.241112294827904, longitude:106.79923123875987}}
            title='M Bloc Space'
            description='A creative hub for youngsters'
          ></Marker >
          <Polyline
            coordinates={this.state.coordinates}
            strokeColor="#bf8221"
            strokeColors={[
              '#bf8221',
              '#ffe066',
              '#ffe066',
              '#ffe066',
              '#ffe066',
            ]}
            strokeWidth={3}
          />
        </MapView>
      </View>
    );
  }
}