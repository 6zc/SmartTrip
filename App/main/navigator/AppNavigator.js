import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import DiscoverScreen from "../screens/DiscoverScreen";

const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
		Discover: DiscoverScreen,
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
