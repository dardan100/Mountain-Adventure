import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.log(error);
    throw new Error("Settings cound not be loaded");
  }
  return settings;
}

export async function updateSettings(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Settings cound not be loaded");
  }
  return data;
}
