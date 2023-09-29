/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useState } from "react";
import CircularPicker from "react-native-circular-picker";
import {
  FAQsIcon,
  GuidanceIcon,
  LogoIcon,
  PhoneIcon,
  ScheduleIcon,
  StarIcon,
  UploadIcon,
} from "src/assets/icons";
import { AppText } from "src/components/ui";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const Knowledge = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [price, setPrice] = useState(15);
  const options = [
    {
      id: 1,
      icon: <PhoneIcon />,
      title: "FAQs",
      path: "assistant/setting/knowledge/faqs",
    },
    {
      id: 2,
      icon: <StarIcon />,
      title: "Upload",
      path: "assistant/setting/knowledge/uploadFile",
    },
    {
      id: 3,
      icon: <StarIcon />,
      title: "Schedule",
      path: "assistant/setting/knowledge/uploadFile",
    },
    {
      id: 3,
      icon: <StarIcon />,
      title: "Guidance",
      path: "assistant/setting/knowledge/guidance",
    },
  ];

  return (
    <View style={[styles.parentContainer, { paddingTop: insets.top + 0 }]}>
      <View style={styles.progressContainer}>
        <CircularPicker
          size={200}
          steps={[15, 40, 70, 100]}
          strokeWidth={20}
          defaultPos={price}
          gradients={{
            0: ["rgb(255, 97, 99)", "rgb(247, 129, 119)"],
            15: ["rgb(255, 204, 0)", "rgb(255, 214, 10)"],
            40: ["rgb(52, 199, 89)", "rgb(48, 209, 88)"],
            70: ["rgb(0, 122, 255)", "rgb(10, 132, 255)"],
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 8 }}>
            {price} %
          </Text>
          <Text style={{ textAlign: "center" }}>Knowledge</Text>
        </CircularPicker>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.box}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("assistant/setting/knowledge/FAQs")
              }
            >
              <FAQsIcon color="#424649" />
              <AppText style={styles.title}>FAQs</AppText>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.box}>
            <UploadIcon width={80} height={80} color="#424649" />
            <AppText style={styles.title}>Upload</AppText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <ScheduleIcon width={80} height={80} color="#424649" />
            <AppText style={styles.title}>Schedule</AppText>
          </View>
          <View style={styles.box}>
            <GuidanceIcon width={80} height={80} color="#424649" />
            <AppText style={styles.title}>Guidance</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    color: "#424649",
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  box: {
    width: "47%",
    height: 180,

    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, // For Android
  },
  parentContainer: {
    flex: 1,
    alignItems: "start",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  progressContainer: {
    backgroundColor: "#fff",
    height: 250,
    width: "100%",
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: "#DEDEDE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,

    color: "red",
    elevation: 10,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  cardContainer: {
    width: "100%",
    marginBottom: 30,
  },
});

export default Knowledge;
