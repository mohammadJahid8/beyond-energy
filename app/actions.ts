"use server";

export const getContacts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], totalCount: 0 };
  }
};
