import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { ShowContext } from "../context/ShowContext";
import EpisodeListItem from "../components/EpisodeListItem";
import Season from "../models/season";
import { getEpisodes } from "../services/tvmazeService";
import ShowListItem from "../components/ShowListItem";

export default function ShowDetailsScreen() {

  const { selectedShow } = useContext(ShowContext);
  const [ episodeList, setEpisodeList ] = React.useState<Season[]>([]);
  const [ expandedSeason, setExpandedSeason ] = useState<number | null>(null);

  useEffect(() => {
    if (selectedShow) {
      getEpisodes(selectedShow.id).then(episodes => {
        const episodesBySeason: Season[] = [];
        episodes.forEach(episode => {
          let season = episodesBySeason.find(s => s.season === episode.season);
          if (!season) {
            season = { season: episode.season, episodes: [] };
            episodesBySeason.push(season);
          }
          season.episodes.push(episode);
        });
        console.log("Fetched episodes:", episodesBySeason);
        setEpisodeList(episodesBySeason);
      }).catch(err => {
        console.error("Failed to fetch episodes:", err);
      });
    }
  }, [selectedShow]);

  return (
    <View style={styles.container}>
      {selectedShow ? (
            <>
              <ShowListItem item={selectedShow} nav={null} bigView={true}/>
              <ScrollView style={styles.scroll}>
                <List.Section>
                  {episodeList.length === 0 ? (
                    <Text style={styles.noEpisodes}>No episodes available.</Text>
                  ) : (
                    episodeList.map((season) => (
                      <List.Accordion
                        key={season.season}
                        title={`Season ${season.season}`}
                        titleStyle={styles.accordionTitle}
                        style={styles.accordion}
                        expanded={expandedSeason === season.season}
                        onPress={() => setExpandedSeason(prev => prev === season.season ? null : season.season)}
                      >
                        {season.episodes.map((ep) => (
                          <EpisodeListItem key={ep.id} item={ep} />
                        ))}
                      </List.Accordion>
                    ))
                  )}
                </List.Section>
              </ScrollView>
            </>
          ) : (
            <Text>No Show Selected</Text>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    summary: {
        fontSize: 12,
        maxWidth: 600,
    },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  poster: {
    width: 120,
    height: 180,
    marginBottom: 16,
    borderRadius: 6,
  },
  scroll: {
    width: '100%',
  },
  noEpisodes: {
    marginTop: 12,
    color: '#666',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  accordion: {
    backgroundColor: '#fff',
    elevation: 1,
  },
});
