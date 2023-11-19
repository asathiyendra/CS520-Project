import { View } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native";

const Screen = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View paddingHorizontal={20} justifyContent="center" flex={1} {...props}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default Screen;
