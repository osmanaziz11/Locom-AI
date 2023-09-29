/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import OptionCard from "src/components/common/OptionCard";

const Settings = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const options = [
    {
      id: 1,
      title: "Assistant Name",
      subtitle: "Set your agent name",
      text: "AI Agent",
      path: "",
    },
    {
      id: 2,
      title: "Assistant Greetings",
      subtitle: "Change your assistant meessage",
      text: "Default",
      path: "assistant/modeScreen",
    },
    {
      id: 3,
      title: "Assistant Knowledge",
      subtitle: "Enhaned your AI assistant",
      text: "Default",
      path: "assistant/settings/knowledge",
    },
    {
      id: 4,
      title: "Assistant Blacklist",
      subtitle: "Enter annoynms users to blacklist",
      text: "None",
      path: "assistant/settingScreen",
    },
  ];

  return (
    <View style={[styles.parentContainer, { paddingTop: insets.top + 0 }]}>
      <View style={{ width: "100%" }}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.id}
          renderItem={({ item: option }) => (
            <View style={{ paddingHorizontal: 5 }}>
              <OptionCard {...option} navigation={navigation} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: "start",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  cardContainer: {
    width: "100%",
    marginBottom: 30,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default Settings;
