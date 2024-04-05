import axios from "axios";

export const getUserFullInfo = async (initialData) => {
  const init = [...initialData];
  const data = init.map((i) => i.userId);

  try {
    const req = await axios.get("http://localhost:5050/dashboard", {
      params: { type: "user", data: data },
    });

    if (req.status === 200) {
      const response = req.data;
      const itemsUpdated = init.map((i) => {
        const item = response.data.filter((j) => j.userId === i.userId);
        return { ...i, ...item[0] };
      });

      return itemsUpdated;
    } else {
      throw new Error("database request error");
    }
  } catch (error) {
    console.log("fetchDB error", error);
  }
};
