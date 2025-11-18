import React, { useContext } from "react";
import { View, Text, Image, Button } from "react-native";
import { Show } from "../services/tvmazeService";
import { ShowContext } from "../context/ShowContext";

export default function ShowListItem({ item, nav }: { item: Show, nav: any }) {

  const { setFavourites, favourites, setSelectedShow } = useContext(ShowContext);

  const openShow = (show: Show) => {

    setSelectedShow(show);
    nav.navigate("Show");
  };

  const addToFavs = () => {
    if (!favourites.includes(item)) {
      setFavourites([...favourites, item])
    }
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      {item.image?.medium && (
        <Image
          source={{ uri: item.image.medium }}
          style={{ width: 60, height: 90, marginRight: 10, borderRadius: 4, borderColor: "#f0dfffff", borderWidth: 1 }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
        <Text numberOfLines={3}>{item.summary?.replace(/<[^>]+>/g, "")}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button title="Add To Favs" onPress={() => addToFavs()} />
        <Button title="Details" onPress={() => openShow(item)} />
      </View>
    </View>

  );
}