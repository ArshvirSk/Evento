import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EVENTS } from '../data/data';
import { CodeMRegisterScreen, GeneralQuizRegisterScreen, ModelRegisterScreen, PosterRegisterScreen, TPPRegisterScreen, TechnicalQuizRegisterScreen } from './RegisterScreens';

const RegisterScreen = ({ route }) => {
  const eventId = route.params.eventId;

  const selectedEvent = EVENTS.find((event) => event.id === eventId);

  const title = selectedEvent.title;
  const EventId = selectedEvent.id;

  const renderRegisterScreen = () => {
    switch (EventId) {
      case 'e1':
        return <PosterRegisterScreen EventId={EventId} title={title} />;

      case 'e2':
        return <ModelRegisterScreen EventId={EventId} title={title} />;

      case 'e3':
        return <GeneralQuizRegisterScreen EventId={EventId} title={title} />;

      case 'e4':
        return <CodeMRegisterScreen EventId={EventId} title={title} />;

      case 'e5':
        return <TechnicalQuizRegisterScreen EventId={EventId} title={title} />;

      case 'e6':
        return <TPPRegisterScreen EventId={EventId} title={title} />;

      default:
        break;
    }
  };

  return <View>{renderRegisterScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    // width: 400,
    marginTop: 0,
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '900',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.5)',
    paddingVertical: 20,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
});

export default RegisterScreen;
