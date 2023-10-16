const reactI18next = jest.createMockFromModule("react-i18next");

reactI18next.useTranslation = () => {
  return {
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

reactI18next.initReactI18next = {
  type: "3rdParty",
  init: () => {},
};

module.exports = reactI18next;
