import { Text, View } from "react-native";

const NewComponent = ({ name, email }: any) => {
  return (
    <>
      <View>
        <Text>{name}</Text>
        <Text>{email}</Text>
      </View>
    </>
  );
};

export default NewComponent;
