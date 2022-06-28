import AsyncStorage from "@react-native-async-storage/async-storage";

// store data into JSON format and put to state
export const saveState = async state => {
	try {
		const serializedState = JSON.stringify(state);
		await AsyncStorage.setItem("state", serializedState);
	} catch (error) {}
};
