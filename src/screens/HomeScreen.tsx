import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from './theme/useTheme';

type Artist = { id: string; name: string; handle: string };
type ArtCard = { id: string; title: string; artist: string };

export default function HomeScreen() {
  const t = useTheme();
  const styles = makeStyles(t);

  const [tab, setTab] = useState<'ForYou' | 'Trending'>('ForYou');

  const artists = useMemo<Artist[]>(
    () => [
      { id: 'a1', name: 'Aisha', handle: '@aisha' },
      { id: 'a2', name: 'Kenji', handle: '@kenji' },
      { id: 'a3', name: 'Mina', handle: '@mina' },
      { id: 'a4', name: 'Leo', handle: '@leo' },
      { id: 'a5', name: 'Nia', handle: '@nia' },
    ],
    []
  );

  const cards = useMemo<ArtCard[]>(
    () => [
      { id: 'c1', title: 'Neon Drift', artist: 'Aisha' },
      { id: 'c2', title: 'Soft Storm', artist: 'Kenji' },
      { id: 'c3', title: 'Blue Silence', artist: 'Mina' },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>ArtSwipe</Text>

        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Search artists, styles..."
            placeholderTextColor={t.placeholder}
            style={styles.search}
          />
        </View>
      </View>

      {/* Toggle */}
      <View style={styles.toggleRow}>
        <ToggleButton
          label="For You"
          active={tab === 'ForYou'}
          onPress={() => setTab('ForYou')}
        />
        <ToggleButton
          label="Trending"
          active={tab === 'Trending'}
          onPress={() => setTab('Trending')}
        />
      </View>

      {/* Featured artists row */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Featured artists</Text>
        <Pressable hitSlop={10}>
          <Text style={styles.link}>See all</Text>
        </Pressable>
      </View>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.artistList}
        renderItem={({ item }) => (
          <Pressable style={styles.artistChip}>
            <View style={styles.avatar} />
            <View style={{ gap: 2 }}>
              <Text style={styles.artistName}>{item.name}</Text>
              <Text style={styles.artistHandle}>{item.handle}</Text>
            </View>
          </Pressable>
        )}
      />

      {/* Feed */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>
          {tab === 'ForYou' ? 'Recommended' : 'Hot right now'}
        </Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feed}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <View style={styles.cardImage} />
            <View style={styles.cardMeta}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>by {item.artist}</Text>

              <View style={styles.cardActions}>
                <Pressable style={styles.smallBtn}>
                  <Text style={styles.smallBtnText}>Save</Text>
                </Pressable>
                <Pressable style={[styles.smallBtn, styles.primaryBtn]}>
                  <Text style={[styles.smallBtnText, styles.primaryBtnText]}>
                    View
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );

  function ToggleButton({
    label,
    active,
    onPress,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
  }) {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.toggleBtn, active && styles.toggleBtnActive]}
      >
        <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
          {label}
        </Text>
      </Pressable>
    );
  }
}

function makeStyles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: t.bg },

    header: {
      paddingHorizontal: 18,
      paddingTop: 10,
      paddingBottom: 12,
      gap: 12,
    },
    brand: { color: t.text, fontSize: 22, fontWeight: '900', letterSpacing: 0.3 },

    searchWrap: {
      height: 46,
      borderRadius: 16,
      backgroundColor: t.card2,
      borderWidth: 1,
      borderColor: t.stroke,
      justifyContent: 'center',
      paddingHorizontal: 14,
    },
    search: { color: t.text, fontSize: 14, fontWeight: '600' },

    toggleRow: { flexDirection: 'row', paddingHorizontal: 18, gap: 10 },
    toggleBtn: {
      flex: 1,
      height: 44,
      borderRadius: 14,
      backgroundColor: t.card,
      borderWidth: 1,
      borderColor: t.stroke,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleBtnActive: { backgroundColor: t.primarySoft, borderColor: t.primaryStroke },
    toggleText: { color: t.muted, fontWeight: '800' },
    toggleTextActive: { color: t.primary },

    sectionHead: {
      marginTop: 16,
      paddingHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    sectionTitle: { color: t.text, fontSize: 16, fontWeight: '900' },
    link: { color: t.muted, fontWeight: '800' },

    artistList: { paddingHorizontal: 18, paddingTop: 12, gap: 12 },
    artistChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 18,
      backgroundColor: t.card,
      borderWidth: 1,
      borderColor: t.stroke2,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: t.image,
    },
    artistName: { color: t.text, fontWeight: '900' },
    artistHandle: { color: t.muted2, fontWeight: '700', fontSize: 12 },

    feed: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 24, gap: 14 },
    card: {
      borderRadius: 22,
      overflow: 'hidden',
      backgroundColor: t.card,
      borderWidth: 1,
      borderColor: t.stroke2,
    },
    cardImage: { height: 180, backgroundColor: t.image },
    cardMeta: { padding: 14, gap: 6 },
    cardTitle: { color: t.text, fontSize: 16, fontWeight: '900' },
    cardSubtitle: { color: t.muted, fontWeight: '700' },

    cardActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
    smallBtn: {
      flex: 1,
      height: 44,
      borderRadius: 14,
      backgroundColor: t.card,
      borderWidth: 1,
      borderColor: t.stroke,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallBtnText: { color: t.text, fontWeight: '900' },
    primaryBtn: { backgroundColor: t.primary, borderColor: t.primary },
    primaryBtnText: { color: t.primaryTextOn },
  });
}
