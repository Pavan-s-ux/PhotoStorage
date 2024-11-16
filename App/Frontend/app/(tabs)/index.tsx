import { Stack } from 'expo-router';
import { StyleSheet, View ,FlatList,Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useEffect,useState } from 'react';
import{Image} from'expo-image';



export default function Home() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const[localAssests,setlocalAssets] = useState<string[]>([]);
  useEffect(() =>{
    if (permissionResponse?.status !== 'granted'){
      requestPermission();
    }

  },[])
  useEffect(() => {
 if(permissionResponse?.status ==='granted'){
  loadlocalAssets();
 }
  },[permissionResponse])
  const loadlocalAssets = async () => {
    const assetsPage  = await MediaLibrary.getAssetsAsync()
   console.log(JSON.stringify(assetsPage,null,2));
   const imageUris = assetsPage.assets.map(asset => asset.uri);


    setlocalAssets(imageUris);
  }
  localAssests.forEach(uri => {
    console.log(uri); // Log each URI
  });
  
  console.log(permissionResponse);
  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <FlatList data={localAssests}
      numColumns={4}
      columnWrapperStyle={{gap:2}}
      contentContainerStyle={{gap:2}}
       renderItem={({item}) => <Image source={{uri: item}} style={{width:'25%' , aspectRatio:1}}/>}/>
    </>
  );
   
}


