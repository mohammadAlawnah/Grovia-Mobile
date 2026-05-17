module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|expo-modules-core))",
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
};