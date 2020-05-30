// eslint-disable-next-line no-undef
module.exports = {
    'testEnvironment': 'node',
    'roots': ['<rootDir>/src'],
    'transform': {
        '^.+\\.tsx?$': 'ts-jest',
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    'moduleFileExtensions': ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
