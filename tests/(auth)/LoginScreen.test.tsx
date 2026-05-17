import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "@/app/(auth)/LoginScreen";
import { login } from "@/api/UserService";

jest.mock("expo-router", () => ({
    useRouter: () => ({
        replace: jest.fn(),
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("expo-secure-store", () => ({
    getItem: jest.fn(() => null),
    setItemAsync: jest.fn(),
}));

jest.mock("@/api/UserService", () => ({
    login: jest.fn(() =>
        Promise.resolve({
            data: { accessToken: "fake-token" },
        })
    ),
}));

describe("Login Screen", () => {
    it("submits email and password correctly", async () => {
        const { getByTestId, getByText } = render(<LoginScreen />);

        const emailInput = getByTestId("email-input");
        const passwordInput = getByTestId("password-input");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "123456");

        fireEvent.press(getByText("Login"));

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "123456",
            });
        });
    });
});