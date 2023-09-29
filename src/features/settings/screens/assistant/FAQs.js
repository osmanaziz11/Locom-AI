/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";

import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import OptionCard from "src/components/common/OptionCard";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { AppText } from "src/components/ui";
import { BackIcon } from "src/assets/icons";

const QuestionCard = ({ title, subtitle, text, navigation, path }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <View
      style={[
        styles.card,
        {
          height: isOpen ? 150 : 50,
        },
      ]}
    >
      <View
        style={[
          styles.expandBtn,
          {
            transform: `rotate(${isOpen ? -270 : 270}deg)`,
          },
        ]}
      >
        <BackIcon width={20} height={20} color="rgba(23, 23, 33, 0.6)" />
      </View>
      <TouchableOpacity onPress={() => setOpen(!isOpen)}>
        <View>
          <View style={{ flexDirection: "column" }}>
            <AppText>{title}</AppText>
            <AppText style={styles.secondaryText}>{subtitle}</AppText>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.answerContainer}>
        <TextInput
          style={styles.textarea}
          multiline
          textAlignVertical="top"
          placeholder="Type here..."

          selectionColor="rgba(23, 23, 33, 0.6)"
        />
      </View>
    </View>
  );
};
const FAQs = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const options = [
    {
      id: 1,
      title: "Whats your business type?",
      subtitle: "Enable system notifications",
      text: "Default",
      path: "assistant/modeScreen",
    },
    {
      id: 2,
      title: "Virtual Numbers",
      subtitle: "Purchase your virtual number",
      text: "",
      path: "assistant/virtualNumberScreen",
    },
    {
      id: 3,
      title: "Call Forwarding Number",
      subtitle: "Enable your forwarding number",
      text: "",
      path: "assistant/modeScreen",
    },
    {
      id: 4,
      title: "Assistant Settings",
      subtitle: "Train your assistant",
      text: "",
      path: "assistant/settingScreen",
    },
    {
      id: 5,
      title: "Assistant Conversations",
      subtitle: "Check your assistant conversations",
      text: "",
      path: "assistant/modeScreen",
    },
    {
      id: 6,
      title: "Assistant Testing",
      subtitle: "Test your assistant knowledge",
      text: "",
      path: "assistant/testingScreen",
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
              <QuestionCard {...option} navigation={navigation} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textarea: {
    width: "100%", // Make the textarea take up the full width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    height: "100%", // Adjust the minimum height as needed
  },
  expandBtn: {
    position: "absolute",
    top: 15,
    right: 10,

    transform: "rotate(270deg)",
  },
  answerContainer: {
    height: 90,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
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
  secondaryText: {
    fontSize: 10,
    paddingTop: 3,
    fontWeight: "light",
    color: "rgba(23, 23, 33, 0.6)",
  },
  subText: {
    fontSize: 10,
    fontWeight: "normal",
    color: "rgba(23, 23, 33, 0.6)",
  },
  subtitle: {
    fontSize: 10,
    color: "gray",
  },
  card: {
    backgroundColor: "#fff",
    height: 150,
    width: "100%",
    position: "relative",
    transition: "all 0.5s",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#999BA8",

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    flexDirection: "column",
    alignItems: "start",
    paddingTop: 10,
    justifyContent: "",
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});

export default FAQs;
