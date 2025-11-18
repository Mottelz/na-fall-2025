import React, { useContext } from "react";
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";
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
    } else {
      setFavourites(favourites.filter(fav => fav.id !== item.id));
    }
  };

  const isFavourite = (item: Show) => {return favourites.includes(item);};

  return (
    <View style={styles.container}>
      {item.image?.medium && (
        <Image
          source={{ uri: item.image.medium }}
          style={styles.image}
        />
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.summary}>{item.summary?.replace(/<[^>]+>/g, "")}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => addToFavs()} style={styles.button}>
          <Text style={styles.buttonText}>{isFavourite(item) ? `Remove From Favs` : `Add To Favs`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openShow(item)} style={styles.button}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    padding: 10,
    borderRadius: 6,
  },
  image: {
    width: 60,
    height: 90,
    marginRight: 10,
    borderRadius: 4,
    borderColor: "#f0dfffff",
    borderWidth: 1,
  },
  details: {
    flex: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  summary: {
    fontSize: 14,
  },
  actions: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#e20946ff",
    padding: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
