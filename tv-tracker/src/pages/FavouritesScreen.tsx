import React, { useState, useEffect, useContext, use } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Show from "../models/show";
import ShowListItem from "../components/ShowListItem";
import { ShowContext } from "../context/ShowContext";

export default function FavouritesScreen({ navigation }: any) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { favourites } = useContext(ShowContext);

  useEffect(() => {
	setLoading(true);
	setShows(favourites);
	setLoading(false);
  }, [favourites]);

  return (
	<View style={{ flex: 1, padding: 16 }}>
	  {loading ? (
		<ActivityIndicator size="large" />
	  ) : (
		<FlatList
		  data={shows}
		  keyExtractor={(item) => item.id.toString()}
		  renderItem={({ item }) => (
				  <>
			<ShowListItem item={item} nav={navigation} />
			</>
		  )}
		/>
	  )}
	</View>
  );
}
