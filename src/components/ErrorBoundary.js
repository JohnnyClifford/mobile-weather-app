import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../theme';

/** Catch render errors and provide a simple recovery action. */
export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}><Text style={styles.title}>Something went wrong</Text><Pressable style={styles.button} onPress={() => this.setState({ hasError: false })}><Text style={styles.buttonText}>Try again</Text></Pressable></View>;
  }
}
