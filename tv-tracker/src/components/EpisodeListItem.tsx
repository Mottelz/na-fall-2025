import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Episode from "../models/episode";


export default function ShowListItem({ item }: { item: Episode }) {
  return (
	<View style={styles.container}>
	  <View style={styles.details}>
		<Text style={styles.title}>{`S${item.season < 10 ? `0${item.season}` : item.season}E${item.number < 10 ? `0${item.number}` : item.number}: ${item.name}`}</Text>
		<Text style={styles.summary}>{item.summary?.replace(/<[^>]+>/g, "")}</Text>
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
});