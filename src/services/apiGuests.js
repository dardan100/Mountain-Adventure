import supabase from "./supabase";

export async function getAllGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("Guests could not be loaded");

  return data;
}
