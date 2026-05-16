import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

type Props = {
  control: any;
  errors: any;
  name: "username";
};

export default function Username({ control, errors, name }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width * 0.8 }}>
      <Text style={[styles.textTitle]}>
        {name}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={{ required: "Username is required" }}
        render={({ field }) => (
          <View>
            <TextInput
              style={[styles.inputStyle]}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value || ""}
              placeholder="Username"
              placeholderTextColor="gray"
              
            />

            {errors?.username?.message ? (
             <Text style={styles.errorText}>
             {errors.username.message}
              </Text>
              ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16
  },
  textTitle: {
    paddingVertical: 8,
    fontSize: 15,
    fontWeight: "500",
    
  },
});