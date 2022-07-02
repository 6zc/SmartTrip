import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
		Discover: DiscoverScreen,
		Signup: SignupScreen,
		Login: LoginScreen,
	},
	{
		mode: "modal",
		headerMode: "none",
	}
);

// use tabs
export default createAppContainer(AppNavigator);

// or
// export default createAppContainer(AppNavigator);
