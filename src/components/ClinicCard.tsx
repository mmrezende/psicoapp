import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Clinic } from "../models/Clinic";

type Props = {clinic: Clinic, openForm: Function};

export const ClinicCard = ({clinic, openForm} : Props) => (
	<Card style={styles.card}>
		<Card.Title title={clinic.name} subtitle={clinic.description} left={LeftContent} />
		<Card.Actions>
			<Button onPress={() => openForm(clinic)}>Iniciar Questionário</Button>
		</Card.Actions>
	</Card>
);

const LeftContent = props => <Avatar.Icon {...props} icon="brain" />

const styles = StyleSheet.create({
	card: {
		marginBottom: 20,
		padding: 5
	}
});