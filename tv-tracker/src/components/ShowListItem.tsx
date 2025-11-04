import React from "react";
import { View, Text, Image } from "react-native";
import { Show } from "../services/tvmazeService";

export default function ShowListItem({ item }: { item: Show }) {
	return (
		<View style={{ flexDirection: "row", marginBottom: 12 }}>
              {item.image?.medium && (
                <Image
                  source={{ uri: item.image.medium }}
                  style={{ width: 60, height: 90, marginRight: 10, borderRadius: 4 }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                <Text numberOfLines={3}>{item.summary?.replace(/<[^>]+>/g, "")}</Text>
              </View>
            </View>
			
	);
}