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
  name: "email";
};

export default function Email({ control, errors, name }: Props) {
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
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email",
          },
        }}
        render={({ field }) => (
          <View>
            <TextInput
              style={[styles.inputStyle, { fontSize: normalize(14) }]}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value || ""}
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {errors?.email?.message && (
              <Text style={[styles.errorText, { fontSize: normalize(14) }]}>
                {errors.email.message}
              </Text>
            )}
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
  },

  textTitle: {
    paddingVertical: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});
