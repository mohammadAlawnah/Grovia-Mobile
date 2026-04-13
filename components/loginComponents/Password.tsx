import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

type Props = {
  control: any;
  errors: any;
  name: string;
  placeholder?: string;
};

export default function Password({
  control,
  errors,
  name,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowDimensions();

  const normalize = (size: number) => {
    return (size / 375) * width;
  };

  return (
    <View style={{ width: width * 0.8 }}>
      <Text style={[styles.textTitle, { fontSize: normalize(14) }]}>
        {name}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <View>
            <View
              style={[
                styles.passwordContainer,
                {
                  height: normalize(48),
                  borderRadius: normalize(10),
                },
              ]}
            >
              <TextInput
                style={[styles.passwordInput, { fontSize: normalize(14) }]}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value || ""}
                placeholder={placeholder || "Password"}
                placeholderTextColor="gray"
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={normalize(18)}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {errors?.[name]?.message && (
              <Text style={[styles.errorText, { fontSize: normalize(14) }]}>
                {errors[name]?.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 5,
  },

  passwordInput: {
    flex: 1,
  },

  errorText: {
    color: "red",
    marginBottom: 15,
  },

  textTitle: {
    paddingVertical: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});
