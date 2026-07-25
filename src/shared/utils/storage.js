const STORAGE_KEY = "demeter-profile";

export const loadProfileStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load profile data:", error);
    return null;
  }
};

export const saveProfileStorage = (profileData) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profileData)
    );
  } catch (error) {
    console.error("Failed to save profile data:", error);
  }
};

export const clearProfileStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};