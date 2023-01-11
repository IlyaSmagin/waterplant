import { supabase } from "../../lib/initSupabase";
export default async function fetchPlants(setStateCallback) {
  const username = JSON.parse(localStorage.getItem("username")) || "lalatest";
  if (!username) {
    localStorage.setItem("username", JSON.stringify("lalatest"));
  }
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
