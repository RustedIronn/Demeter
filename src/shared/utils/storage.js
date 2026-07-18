const STORAGE_KEY = "demeter-personal";

export const loadPersonalStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load personal data:", error);
    return null;
  }
};

export const savePersonalStorage = (personalData) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(personalData)
    );
  } catch (error) {
    console.error("Failed to save personal data:", error);
  }
};

export const clearPersonalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};