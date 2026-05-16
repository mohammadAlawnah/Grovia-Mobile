import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


export default function SqliteExampleScreen() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const database = await SQLite.openDatabaseAsync("note.db");
      await database.execAsync(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL);"
      );
      if (!cancelled) setDb(database);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    if (!db) return;
    const rows = await db.getAllAsync<{ text: string }>(
      "SELECT text FROM notes ORDER BY id DESC;"
    );
    setLines(rows.map((r) => r.text));
  }, [db]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = async () => {
    const text = input.trim();
    if (!db || !text) return;
    await db.runAsync("INSERT INTO notes (text) VALUES (?);", text);
    setInput("");
    await reload();
  };

  return (
    
  <View style={styles.container}>
    
    <Text style={styles.title}>Offline Notes</Text>
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Write a note..."
        placeholderTextColor="#9ca3af"
      />
      <Pressable onPress={() => void save()} style={styles.btn}>
        <Text style={styles.btnText}>Save Note</Text>
      </Pressable>
    </View>

    
    <Text style={styles.listLabel}>Your Notes</Text>

    <FlatList
      data={lines}
      keyExtractor={(item, i) => `${i}-${item}`}
      renderItem={({ item }) => (
        <View style={styles.item} >
          <Text>{item}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>No notes yet</Text>
      }
    />
  </View>
  
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingTop: 50,
    
  },
  title: {
    fontSize: 26,
    marginTop: 40,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#cbd1d8",
    marginBottom: 18,
  },

  input: {
    fontSize: 15,
    paddingVertical: 10,
    color: "#0f172a",
  },

  btn: {
    marginTop: 10,
    backgroundColor: "#0f172a",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  listLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
  },

  item: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#cbd1d8",
  },
  empty: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 14,
  },
});