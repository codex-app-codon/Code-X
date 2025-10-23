import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

interface Script {
  id: number;
  name: string;
  code: string;
}

export default function App() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hallo Welt!</h1>');
  const [scripts, setScripts] = useState<Script[]>([]);
  const [newScriptName, setNewScriptName] = useState('');

  // Script speichern
  const saveScript = () => {
    if (!newScriptName) {
      Alert.alert('Bitte Namen eingeben');
      return;
    }
    const newScript: Script = {
      id: scripts.length + 1,
      name: newScriptName,
      code: htmlCode,
    };
    setScripts([...scripts, newScript]);
    setNewScriptName('');
    Alert.alert('Script gespeichert!');
  };

  // Script aus Store laden
  const loadScript = (script: Script) => {
    setHtmlCode(script.code);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Editor */}
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.title}>HTML Editor</Text>
        <TextInput
          style={styles.editor}
          multiline
          value={htmlCode}
          onChangeText={setHtmlCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Script Name"
          value={newScriptName}
          onChangeText={setNewScriptName}
        />
        <Button title="Script speichern" onPress={saveScript} />
      </View>

      {/* Vorschau */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Preview</Text>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlCode }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Mini Store */}
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.title}>Mini Script Store</Text>
        <ScrollView>
          {scripts.map((s) => (
            <Button key={s.id} title={s.name} onPress={() => loadScript(s)} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  editor: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
    fontFamily: 'monospace',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
  },
});