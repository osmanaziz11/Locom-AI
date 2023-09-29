/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { ArrowIcon, BackIcon, FAQsIcon, SendIcon } from 'src/assets/icons';
import ProfileImage from 'src/components/common/ProfileImage';
import { AppText } from 'src/components/ui';
import { assistantTestingStyle } from '../../style/assistant/AssistantTesting';

const Testing = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector(({ $auth }) => $auth.user);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi there, This is AI Agent. How can i help you?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'asda',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 8 }}>
          <SendIcon width={35} height={35} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'black',
            marginBottom: 20,
            borderRadius: 8,
          },
          left: {
            marginBottom: 20,
            borderRadius: 8,
            marginRight: 10,
            marginLeft: 2,
            position: 'relative',
            right: 45,
            maxWidth: '100%',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 12,
          },
          left: {
            color: 'black',
            fontSize: 12,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <AppText>asdasas</AppText>;
  };

  return (
    <View style={assistantTestingStyle.parentContainer}>
      <View>
        <ProfileImage
          size={105}
          uri={user.picture}
          style={{ marginBottom: 8 }}
        />
        <View
          style={
            isConnected
              ? assistantTestingStyle.onlineDot
              : assistantTestingStyle.offlineDot
          }
        />
      </View>
      <AppText>AI Agent</AppText>
      <View style={assistantTestingStyle.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 2,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          scrollToBottom
          textInputProps={{
            style: assistantTestingStyle.inputFieldStyle,
            placeholder: 'Type your message here',
          }}
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
    </View>
  );
};

export default Testing;
