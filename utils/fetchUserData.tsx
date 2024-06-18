// utils/fetchUserData.ts
export const fetchUserData = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    return {
      username: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.medium,
    };
  };
  