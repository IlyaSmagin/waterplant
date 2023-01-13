import { supabase } from "../../lib/initSupabase";

const getLocalStorageUsername = () => {
  const username = JSON.parse(localStorage.getItem("username"));
  if (!username) {
    localStorage.setItem("username", JSON.stringify("lalatest"));
  }
  return username || "lalatest";
};

export async function fetchPlants(setStateCallback) {
  const username = getLocalStorageUsername();
  let foundUser = false;
  while (!foundUser) {
    let { data: users } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (!users[0]) {
      setTimeout(() => {}, 1000);
    } else {
      foundUser = true;
      const { data: plants } = await supabase
        .from("plants")
        .select("*")
        .in("id", users[0].plantsarray)
        .order("id", true);

      setStateCallback(plants);
    }
  }
}

export const addPlantToUserArray = async (plantIndex, username) => {
  let { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (users.length < 1) {
    const newArray = [...users, plantIndex];
    const { data } = await supabase
      .from("users")
      .insert([{ username: username, plantsarray: newArray }]);
  } else {
    const newArray = [...users[0].plantsarray, plantIndex];
    const { data } = await supabase
      .from("users")
      .update({ plantsarray: newArray })
      .eq("username", username);
  }
};

export const removePlantFromUserArray = async (
  idToRemove,
  plants,
  setPlants
) => {
  const username = getLocalStorageUsername();
  const newArray = plants
    .filter((plant) => plant.id != idToRemove)
    .map((plant) => {
      return plant.id;
    });
  const { data } = await supabase
    .from("users")
    .update({ plantsarray: newArray })
    .eq("username", username);
  setPlants(plants.filter((plant) => plant.id != idToRemove));
};

export const fetchSortedPlants = async (sortParam, setPlants) => {
  const { data: plants } = await supabase
    .from("plants")
    .select("*")
    .order(sortParam, true);
  setPlants(plants);
};

export const addNewUser = async (username) => {
  let { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (users?.length < 1) {
    const { data } = await supabase
      .from("users")
      .insert([{ username: username, plantsarray: [] }]);
  }
};
