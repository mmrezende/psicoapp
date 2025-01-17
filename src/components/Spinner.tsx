import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Spinner = () => (
	<View style={styles.container}>
		<ActivityIndicator size="large" color="#007aff" />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});