return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {
            paddingHorizontal: width * 0.05,
            minHeight: height,
            paddingTop: height * 0.02,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        <Text style={[styles.title, { fontSize: normalize(20) }]}>
          Login page
        </Text>

        <View style={{ width: width * 0.8 }}>
          <Email control={control} errors={errors} name="email" />

          <Password
            control={control}
            errors={errors}
            name="password"
            placeholder="Password"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={{ width: width * 0.8 }}>
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={styles.forgotContainer}>
          <Link href={"/ForgotPasswordScreen"}>
            <Text style={{ fontSize: normalize(16) }}>Forgot Password?</Text>
          </Link>
        </View>

        <View style={styles.signupContainer}>
          <Text style={{ fontSize: normalize(14) }}>
            Dont have an account?
          </Text>

          <Link href={"/RegisterScreen"}>
            <Text style={[styles.signupText, { fontSize: normalize(14) }]}>
              Sign up
            </Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);